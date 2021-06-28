import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  await server.register(require('./responseError'));
  await server.register(require('./responseTask'));
}
