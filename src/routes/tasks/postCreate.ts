import { FastifyReply, FastifyRequest } from 'fastify';
import DecoratedFastifyInstance from '../../types/DecoratedFastifyInstance';
import Task from '../../Domain/ValueObjects/Task';
import Location from '../../Domain/ValueObjects/Location';
import TaskDefinition from '../../Domain/ValueObjects/TaskDefinition';
import TaskState from '../../Domain/ValueObjects/TaskState';

interface Request extends FastifyRequest {
  params: {
    location: string;
    definition: string;
  };
}

export default async function (server: DecoratedFastifyInstance) {
  server.route({
    method: 'POST',
    url: '/create/:location/:definition',
    schema: {
      params: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            enum: Location.ALL_LOCATIONS,
          },
          definition: {
            type: 'string',
            enum: TaskDefinition.ALL_DEFINITIONS,
          },
        },
      },
      response: {
        201: { $ref: 'responseTask#' },
      },
    },
    handler: async (request: Request, reply: FastifyReply): Promise<void> => {
      const task: Task = new Task(
        server.idGenerator(),
        new Location(request.params.location),
        new TaskDefinition(request.params.definition),
        new TaskState(TaskState.PENDING),
      );
      await server.repository.add(task);
      reply.code(201).send(task.toPresentation());
    },
  });
}
