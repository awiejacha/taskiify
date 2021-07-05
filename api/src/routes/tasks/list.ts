import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Task from '../../Domain/ValueObjects/Task';

export default async (fastify: FastifyInstance) => {
  fastify.get('/list', {
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
      const tasks = await fastify.repository.findNotDone();

      if (!tasks.length) {
        reply.code(404).send();

        return;
      }

      reply.code(200).send(tasks.map((task: Task) => task.toPresentation()));
    },
  });
};
