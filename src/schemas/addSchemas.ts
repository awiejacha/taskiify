import { FastifyInstance } from 'fastify';
import responseError from './responseError';
import responseTask from './responseTask';

export default async function (server: FastifyInstance) {
  await responseError(server);
  await responseTask(server);
}
