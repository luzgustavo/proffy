import Knex from 'knex';

export async function up(knex: Knex) {
   return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('avatar').notNullable();
      table.string('whatsapp').notNullable();
      table.string('bio').notNullable();
      table.collate('utf8mb4_unicode_ci');
   });
}

export async function down(knex: Knex) {
   return knex.schema.dropTable('users');
}