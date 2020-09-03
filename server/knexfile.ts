import path from 'path';

module.exports = { 
   client: 'mysql', 
   connection: {
      host : 'mysql.gustavodaluz.com.br',
      user : 'gustavodaluz08',
      password : 'db08gus',
      database : 'gustavodaluz08'
   }, 
   migrations: { 
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
   }
};