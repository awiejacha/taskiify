import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import TaskNotAssignableError from '../../Domain/Errors/TaskNotAssignableError';
import Person from '../../Domain/ValueObjects/Person';

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
        const task = await fastify.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.assignTo(new Person(request.params.assignee));
        await fastify.repository.add(task);
        reply.code(200).send(task.toPresentation());
      } catch (error) {
        if (error instanceof TaskNotAssignableError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
