import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import RegressNotPossibleError from '../../../domain/Errors/RegressNotPossibleError';
import TaskNotFoundError from '../../../domain/Errors/TaskNotFoundError';

type Params = {
  id: string;
  assignee: string;
};

export default async (fastify: FastifyInstance) => {
  fastify.put<{ Params: Params }>('/:id/regress', {
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
        const regressedTask = await fastify.taskService.regress(request.params.id);
        reply.code(200).send(regressedTask.toPresentation());
      } catch (error) {
        if (error instanceof TaskNotFoundError) {
          reply.code(404).send();
        } else if (error instanceof RegressNotPossibleError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
