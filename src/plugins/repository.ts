import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import knex from 'knex';
import KnexRepository from '../Infrastructure/KnexRepository';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'mysql.docker.internal',
    user: 'root',
    password: 'password',
    database: 'taskiify',
  },
});

export default fastifyPlugin(async (server: FastifyInstance, options = {}) => {
  const repository = new KnexRepository(db);
  server.decorate('repository', repository);
});
