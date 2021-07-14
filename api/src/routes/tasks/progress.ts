import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ProgressNotPossibleError from '../../Domain/Errors/ProgressNotPossibleError';

type Params = {
  id: string;
  assignee: string;
};

export default async (fastify: FastifyInstance) => {
  fastify.put<{ Params: Params }>('/:id/progress', {
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
    handler: async (
      request: FastifyRequest<{ Params: Params }>, reply: FastifyReply): Promise<void> => {
      try {
        const task = await fastify.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.progress();
        await fastify.repository.add(task);
        reply.code(200).send(task.toPresentation());
      } catch (error) {
        if (error instanceof ProgressNotPossibleError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
