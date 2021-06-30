import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyAutoload, { AutoloadPluginOptions } from 'fastify-autoload';
import { join } from 'path';
import repository from './plugins/repository';
import uniqueId from './plugins/unique-id';
import responseError from './schemas/response-error';
import responseTask from './schemas/response-task';

export type AppOptions = {
// TODO: Make use of it or kill
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify: FastifyInstance,
  opts: AppOptions,
): Promise<void> => {
  void responseError(fastify);
  void responseTask(fastify);
  void fastify.register(uniqueId);
  void fastify.register(repository);
  void fastify.register(fastifyAutoload, {
    dir: join(__dirname, 'routes/tasks'),
    options: { prefix: 'tasks' },
  });
};

export default app;
export { app };
