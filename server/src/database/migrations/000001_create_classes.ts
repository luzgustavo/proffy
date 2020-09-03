import Knex from 'knex';

export async function up(knex: Knex) {
   return knex.schema.createTable('classes', table => {
      table.increments('id').primary().unsigned();    
      table.integer('user_id', 10).unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
      table.integer('subject_id').unsigned().notNullable().references('id').inTable('subjects').onUpdate('CASCADE').onDelete('CASCADE');   
      table.decimal('cost').notNullable();
      table.collate('utf8mb4_unicode_ci');
   });
}

export async function down(knex: Knex) {
   return knex.schema.dropTable('classes');
}