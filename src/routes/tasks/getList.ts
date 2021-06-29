import { FastifyReply, FastifyRequest } from 'fastify';
import Task from '../../Domain/ValueObjects/Task';
import TaskiifyInstance from '../../types/TaskiifyInstance';

export default async function (server: TaskiifyInstance) {
  await server.get('/list', {
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
