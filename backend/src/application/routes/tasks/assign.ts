import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import TaskNotAssignableError from '../../../domain/Errors/TaskNotAssignableError';
import TaskNotFoundError from '../../../domain/Errors/TaskNotFoundError';
import Person from '../../../domain/ValueObjects/Person';

type Params = {
  id: string;
  assignee: string;
};

export default async (fastify: FastifyInstance) => {
  fastify.put('/:id/assign/:assignee', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          assignee: {
            type: 'string',
            enum: Person.ALL_PERSONS,
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
        const assignedTask = await fastify.taskService.assign(
          request.params.id,
          request.params.assignee,
        );
        reply.code(200).send(assignedTask.toPresentation());
      } catch (error) {
        if (error instanceof TaskNotFoundError) {
          reply.code(404).send();
        } else if (error instanceof TaskNotAssignableError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
