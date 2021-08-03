import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import LocationNotApplicableError from '../../../domain/Errors/LocationNotApplicableError';
import Location from '../../../domain/ValueObjects/Location';
import TaskDefinition from '../../../domain/ValueObjects/TaskDefinition';

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
        const task = await fastify.taskService.create(
          request.params.location,
          request.params.definition,
        );
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
