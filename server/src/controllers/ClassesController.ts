
import { Request, Response } from 'express'; 
import db from '../database/connection';

interface ScheduleItem {
   week_day: number,
   from: string, 
   to: string 
}

export default class ClassesController {

   async index(request: Request, response: Response) {
      const filters = request.query;

      const week_day = filters.week_day as string;
      const subject = filters.subject as string;
      const time = filters.time as string;

      if(!filters.week_day || !filters.subject || !filters.time) {
         return response.status(400).json({
            error: 'Missing filters to search classes'
         })
      }

      const classes = await db('classes') 
      
         .whereExists(function () {
            this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('class_schedule.class_id = classes.id')
            .whereRaw('class_schedule.week_day = ??', [ Number(week_day) ])
            .where('class_schedule.from', '<=',  time +':00' )
            .where('class_schedule.to', '>',  time +':00' )

         }) 
         .where('classes.subject_id', subject)
         .join('users', 'classes.user_id', '=', 'users.id')
         .join('subjects', 'subjects.id', '=', 'classes.subject_id')
         .select(['classes.*', 'users.*', 'subjects.name AS subject_name']);
  
      return response.json(classes);
   }

   async create(request: Request, response: Response) {
      const {
         name, 
         avatar,
         whatsapp,
         bio,
         subject, 
         cost,
         schedule
      } = request.body;
    
      const trx = await db.transaction();
   
      try {
         
         const insertedUsersIds = await trx('users').insert({
            name, 
            avatar,
            whatsapp,
            bio
         });
      
         const user_id = insertedUsersIds[0];
      
         const insertedClassesIds = await trx('classes').insert({             
            user_id,
            subject_id: subject, 
            cost
         });
      
         const class_id = insertedClassesIds[0];
      
         const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
               class_id,
               week_day: scheduleItem.week_day,
               from: scheduleItem.from +':00',
               to: scheduleItem.to +':00'
            };
         });
      
         await trx('class_schedule').insert(classSchedule);
      
         await trx.commit();
         
         return response.status(201).send();
   
      } catch(err) {
   
         await trx.rollback;
   
         return response.status(400).json({
            error: 'Unexpected error while creating new class'
         });
   
      }
   }

};