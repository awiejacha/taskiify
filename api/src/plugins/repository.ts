import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import knex from 'knex';
import Repository from '../Domain/Repository';
import KnexRepository from '../Infrastructure/KnexRepository';

export default fastifyPlugin(async (
  fastify: FastifyInstance) => {
  const db = knex({
    client: 'mysql2',
    connection: {
      host: process.env.APP_DB_HOST,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASS,
      database: process.env.APP_DB_NAME,
    },
  });
  const repository = new KnexRepository(db);
  fastify.decorate('repository', repository);
});

declare module 'fastify' {
  export interface FastifyInstance {
    repository: Repository;
  }
}
