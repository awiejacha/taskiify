import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  await server.addSchema({
    $id: 'responseError',
    type: 'object',
    properties: {
      errorMessage: {
        type: 'string',
      },
    },
  });
}
