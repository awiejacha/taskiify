import { FastifyReply, FastifyRequest } from 'fastify';
import ProgressNotPossibleError from '../../Domain/Errors/ProgressNotPossibleError';
import TaskiifyInstance from '../../types/TaskiifyInstance';

interface Request extends FastifyRequest {
  params: {
    id: string;
  };
}

export default async function (server: TaskiifyInstance) {
  await server.put('/:id/progress', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
      },
      response: {
        200: { $ref: 'responseTask#' },
        404: {},
        409: { $ref: 'responseError#' },
      },
    },
    handler: async (request: Request, reply: FastifyReply): Promise<void> => {
      try {
        const task = await server.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.progress();
        await server.repository.add(task);
        reply.code(200).send(task.toPresentation());
      } catch (e) {
        if (e instanceof ProgressNotPossibleError) {
          reply.code(409).send(e.toPresentation());
        } else {
          throw e;
        }
      }
    },
  });
}
