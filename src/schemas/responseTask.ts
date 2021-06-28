import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  await server.addSchema({
    $id: 'responseTask',
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
      definition: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
      assignee: {
        type: 'string',
      },
      responsible: {
        type: 'string',
      },
    },
  });
}
