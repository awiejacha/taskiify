import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import LocationNotApplicableError from '../../Domain/Errors/LocationNotApplicableError';
import Location from '../../Domain/ValueObjects/Location';
import Task from '../../Domain/ValueObjects/Task';
import TaskDefinition from '../../Domain/ValueObjects/TaskDefinition';
import TaskState from '../../Domain/ValueObjects/TaskState';

type Params = {
  location: string;
  definition: string;
};

export default async (fastify: FastifyInstance) => {
  fastify.post<{ Params: Params }>('/create/:location/:definition', {
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
        409: { $ref: 'responseError#' },
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: Params }>, reply: FastifyReply): Promise<void> => {
      try {
        const task: Task = new Task(
          fastify.generateUniqueId(),
          new Location(request.params.location),
          new TaskDefinition(request.params.definition),
          new TaskState(TaskState.PENDING),
        );
        await fastify.repository.add(task);
        reply.code(201).send(task.toPresentation());
      } catch (error) {
        if (error instanceof LocationNotApplicableError) {
          reply.code(409).send(error.toPresentation());
        } else {
          throw error;
        }
      }
    },
  });
};
