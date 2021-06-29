import { FastifyReply, FastifyRequest } from 'fastify';
import TaskNotAssignableError from '../../Domain/Errors/TaskNotAssignableError';
import Person from '../../Domain/ValueObjects/Person';
import TaskiifyInstance from '../../types/TaskiifyInstance';

interface Request extends FastifyRequest {
  params: {
    id: string;
    assignee: string;
  };
}

export default async function (server: TaskiifyInstance) {
  await server.put('/:id/assign/:assignee', {
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
    handler: async (request: Request, reply: FastifyReply): Promise<void> => {
      try {
        const task = await server.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.assignTo(new Person(request.params.assignee));
        await server.repository.add(task);
        reply.code(200).send(task.toPresentation());
      } catch (e) {
        if (e instanceof TaskNotAssignableError) {
          reply.code(409).send(e.toPresentation());
        } else {
          throw e;
        }
      }
    },
  });
}
