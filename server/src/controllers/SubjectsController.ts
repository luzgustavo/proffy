
import { Request, Response } from 'express'; 
import db from '../database/connection';
  
export default class SubjectsController {

   async index(request: Request, response: Response) { 
      const subjects = await db('subjects');   
      return response.json(subjects);
   }

   async create(request: Request, response: Response) {
      const {
         name 
      } = request.body;
    
      const trx = await db.transaction();
   
      try {
          
         const insertedSubjectIds = await trx('subjects').insert({ 
            name
         });
       
         await trx.commit();
         
         return response.status(201).send();
   
      } catch(err) {
   
         await trx.rollback;
   
         return response.status(400).json({
            error: 'Unexpected error while creating new subject'
         });
   
      }
   }

};