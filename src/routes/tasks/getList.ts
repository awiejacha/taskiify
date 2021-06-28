import { FastifyReply, FastifyRequest } from 'fastify';
import DecoratedFastifyInstance from '../../types/DecoratedFastifyInstance';
import Task from '../../Domain/ValueObjects/Task';

export default async function (server: DecoratedFastifyInstance) {
  server.route({
    method: 'GET',
    url: '/list',
    schema: {
      response: {
        200: {
          type: 'array',
          items: { $ref: 'responseTask#' },
        },
        404: {},
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      const tasks = await server.repository.findNotDone();

      if (!tasks.length) {
        reply.code(404).send();

        return;
      }

      reply.code(200).send(tasks.map((task: Task) => task.toPresentation()));
    },
  });
}
