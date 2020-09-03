import React, { useState, FormEvent, useEffect } from 'react'; 

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';
 
import closeIcon from '../../assets/images/icons/close.svg';
 
function TeacherList() {
      
   const [searched, setSearched] = useState(false); 
   const [teachers, setTeachers] = useState([]);

   const [subject, setSubject] = useState('');
   const [week_day, setWeekDay] = useState('');
   const [time, setTime] = useState('');

   const [subjectItems, setSubjectItems] = useState([]);

   const [formError, setFormError] = useState({ status: false, message: '' });

   async function searchTeachers(e: FormEvent) {
      e.preventDefault();

      if(subject !== '' && week_day !== '' && time !== '')
      {
         closeError();

         const response = await api.get('classes', {
            params: {
               subject: encodeURI(subject), 
               week_day, 
               time
            }
         }); 
 
         setTeachers(response.data);
         setSearched(true);
      }
      else {
         setFormError({ status: true, message: 'Todos os campos do formulário são obrigatórios.' });
      }
   }

   function closeError() {
      setFormError({ status: false, message: '' });
   }
    
   useEffect(() => {
      async function loadSubjects() {
         const response = await api.get('/subjects');
         setSubjectItems(response.data);  
      }

      loadSubjects();
   }, []);

   return (
      <div id="page-teacher-list" className="container">

        <PageHeader title="Estes são os proffys disponíveis">
            <form id="search-teachers" onSubmit={searchTeachers}>

               <Select 
                  name="subject" 
                  label="Matéria" 
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value) }}
                  options={subjectItems.map(({ id, name }) => {
                     return{ value: id, label: name }
                  })}
               />

               <Select 
                  name="week_day" 
                  label="Dia da Semana" 
                  value={week_day}
                  onChange={(e) => { setWeekDay(e.target.value) }}
                  options={[
                     { value: '0', label: 'Domingo' }, 
                     { value: '1', label: 'Segunda-feira' },
                     { value: '2', label: 'Terça-feira' },
                     { value: '3', label: 'Quarta-feira' },
                     { value: '4', label: 'Quinta-feira' },
                     { value: '5', label: 'Sexta-feira' },
                     { value: '6', label: 'Sábado' }   
                  ]}
               />
               
               <Input name="time" label="Hora" type="time" value={time} onChange={(e) => { setTime(e.target.value) }} />
                
               <div className="button-block"> 
                  <button type="submit"> 
                     Buscar
                  </button>
               </div>

               {formError.status && (
                  <div id="formError">
                     <div>
                        {formError.message}    
                     </div>

                     <button type="button" onClick={ () => { closeError() }} >
                        <img src={closeIcon} alt="x" />
                     </button>

                  </div>
               )}
            </form>
         </PageHeader>

         <main>
            {(teachers.length > 0) ? 
               teachers.map((teacher: Teacher) => {
                  return <TeacherItem key={teacher.id} teacher={teacher} />;
               }) : (
               (searched) ? 
               <div id="teacher-empty"><strong>Nenhum proffy disponível!</strong><br />Utilize o formulário acima para realizar uma nova busca conforme sua disponibilidade.</div> : 
               <div id="teacher-empty">Encontre os proffys da matéria que você precisa utilizando o formulário acima para realizar uma busca conforme sua disponibilidade.</div>
            )} 

         </main>
      </div>
   );
}

export default TeacherList;