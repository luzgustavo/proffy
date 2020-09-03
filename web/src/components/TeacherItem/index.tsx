import React from 'react';
import api from '../../services/api';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {  
   id: number;    
   avatar: string;
   bio: string;
   cost: number;
   name: string;
   subject_name: string;
   whatsapp: string; 
}

interface TeacherItemProps { 
   teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

   function createNewConnection() {
      api.post('connections', {
         user_id: teacher.id
      });
   }

   
   function formatMoney( string: number ){ 
      return string.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
   }


   return (
      <article className="teacher-item">
         <header>
            <img src={teacher.avatar} alt={teacher.name} />
            <div>
               <strong>{teacher.name}</strong>
               <span>{teacher.subject_name}</span>
            </div>
         </header>

         <p>{teacher.bio}</p>

         <footer>
            <p>
               <span>Preço/Hora</span>
               <strong>{formatMoney(teacher.cost)}</strong>
            </p>
            <a onClick={createNewConnection} target="_blank" href={`https://wa.me/${teacher.whatsapp}`}>
               <img src={whatsappIcon} alt="Whatsapp"/>
               Entrar em Contato
            </a>
         </footer>
      </article>
   );
}

export default TeacherItem;