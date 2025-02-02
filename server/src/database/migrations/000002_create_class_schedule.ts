import Knex from 'knex';

export async function up(knex: Knex) {
   return knex.schema.createTable('class_schedule', table => {
      table.increments('id').primary();
      
      table.integer('week_day').notNullable();
      table.time('from').notNullable();
      table.time('to').notNullable();
 
      table.collate('utf8mb4_unicode_ci');

      table.integer('class_id', 10).unsigned().notNullable().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
   });
}

export async function down(knex: Knex) {
   return knex.schema.dropTable('class_schedule');
}