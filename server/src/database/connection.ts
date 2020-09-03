import knex from 'knex';
import path from 'path';

const db = knex({
   client: 'mysql', 
   connection: {
      host : 'mysql.gustavodaluz.com.br',
      user : 'gustavodaluz08',
      password : 'db08gus',
      database : 'gustavodaluz08'
   }
});

export default db;