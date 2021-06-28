import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  await server.register(require('./tasks/getList'), { prefix: 'tasks' });
  await server.register(require('./tasks/postCreate'), { prefix: 'tasks' });
  await server.register(require('./tasks/putAssign'), { prefix: 'tasks' });
  await server.register(require('./tasks/putProgress'), { prefix: 'tasks' });
  await server.register(require('./tasks/putRegress'), { prefix: 'tasks' });
}
