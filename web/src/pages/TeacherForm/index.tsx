import React, { useState, FormEvent, useEffect } from 'react'; 
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

function TeacherForm() {

   const history = useHistory();

   const [name, setName] = useState('');
   const [avatar, setAvatar] = useState('');
   const [whatsapp, setWhatsapp] = useState('');
   const [bio, setBio] = useState('');

   const [subject, setSubject] = useState('');
   const [cost, setCost] = useState('');

   const [subjectItems, setSubjectItems] = useState([]);
   const [scheduleItems, setScheduleItems] = useState([
      { week_day: 0, from: '', to: '' }
   ]); 
 
   useEffect(() => {
      async function loadSubjects() {
         const response = await api.get('/subjects');
         setSubjectItems(response.data);  
      }

      loadSubjects();
   }, []);
 
   function addNewScheduleItem() {
      setScheduleItems([
         ...scheduleItems,
         {
            week_day: 0,
            from: '',
            to: '',
         }
      ]); 
   }

   function handleCreateClass(e: FormEvent) {

      e.preventDefault();
 
      api.post('classes', {
         name,
         avatar, 
         whatsapp,
         bio,
         subject, 
         cost: Number(cost), 
         schedule: scheduleItems
      }).then(() => {
         alert('sucesso');
         history.push('/');
      }).catch(() => {
         alert('erro');
      });
      
   }
 
   function setScheduleItemValue(position: number, field: string, value: string) {
      const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
         if(index === position) {
            return { ...scheduleItem, [field]: value };
         }

         return scheduleItem;
      }); 

      setScheduleItems(updatedScheduleItems);
   }

   return (
      <div id="page-teacher-form" className="container">
         <PageHeader 
         title="Incrível que você quer das aulas." 
         description="O primeiro passo é preencher este formulário de inscrição."
         />    

         <main>
            <form onSubmit={handleCreateClass}>
                  
               <fieldset>
                  <legend>Seus dados</legend>

                  <Input name="name" label="Nome Completo" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                  <Input name="avatar" label="Avatar" type="text" value={avatar} onChange={(e) => { setAvatar(e.target.value) }} />
                  <Input name="whatsapp" label="Whatsapp" type="text" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value) }} />
                  <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                  
               </fieldset>

               <fieldset>
                  <legend>
                     Sobre a aula 
                  </legend>

                  <Select 
                  name="subject" 
                  label="Matéria" 
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value) }}
                  options={subjectItems.map(({ id, name }) => {
                     return { value: id, label: name}
                  })}
                  />
                  <Input name="cost" label="Custo por hora/aula" type="text" value={cost} onChange={(e) => { setCost(e.target.value) }}  />
                  

               </fieldset>

               <fieldset>
                  <legend>
                     <div>
                        Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo Horário</button>
                     </div>
                  </legend>
                  
                  {scheduleItems.map((scheduleItem, index) => {
                     return (
                        <div key={scheduleItem.week_day} className="schedule-item">
                     
                           <Select 
                              name="week_day" 
                              label="Dia da Semana" 
                              value={scheduleItem.week_day}
                              onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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

                           <Input 
                           name="from" 
                           label="Das" 
                           type="time" 
                           value={scheduleItem.from}
                           onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                           />

                           <Input 
                           name="to" 
                           label="Até" 
                           type="time" 
                           value={scheduleItem.to}
                           onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                           />
                           
                        </div>
                     )
                  })}

               </fieldset>

               <footer>
                  <p>
                     <img src={warningIcon} alt="Aviso Importante"/>
                     Importante!<br />
                     Preencha todos os dados do formulário acima
                  </p>

                  <button type="submit">Salvar Cadastro</button>
               </footer>

            </form>           
         </main>    

      </div>
   );
}

export default TeacherForm;