import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import ProgressNotPossibleError from '../../../domain/Errors/ProgressNotPossibleError';
import TaskNotFoundError from '../../../domain/Errors/TaskNotFoundError';

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
        const progressedTask = await fastify.taskService.progress(request.params.id);
        reply.code(200).send(progressedTask.toPresentation());
      } catch (error) {
        if (error instanceof TaskNotFoundError) {
          reply.code(404).send();
        } else if (error instanceof ProgressNotPossibleError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
