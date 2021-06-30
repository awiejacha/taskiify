import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import RegressNotPossibleError from '../../Domain/Errors/RegressNotPossibleError';

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
        const task = await fastify.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.regress();
        await fastify.repository.add(task);
        reply.code(200).send(task.toPresentation());
      } catch (e) {
        if (e instanceof RegressNotPossibleError) {
          reply.code(409).send(e.toPresentation());
        } else {
          throw e;
        }
      }
    },
  });
};
