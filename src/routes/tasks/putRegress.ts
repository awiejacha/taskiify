import { FastifyReply, FastifyRequest } from 'fastify';
import DecoratedFastifyInstance from '../../types/DecoratedFastifyInstance';
import RegressNotPossibleError from '../../Domain/Errors/RegressNotPossibleError';

interface Request extends FastifyRequest {
  params: {
    id: string;
  };
}

export default async function (server: DecoratedFastifyInstance) {
  server.route({
    method: 'PUT',
    url: '/:id/regress',
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
    handler: async (request: Request, reply: FastifyReply): Promise<void> => {
      try {
        const task = await server.repository.findById(request.params.id);

        if (!task) {
          reply.code(404).send();

          return;
        }

        task.regress();
        await server.repository.add(task);
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
}