import { fastify, FastifyInstance } from 'fastify';
import addSchemas from '../schemas/addSchemas';

const server: FastifyInstance = fastify();

(async () => {
  try {
    await addSchemas(server);
    await server.register(require('../plugins/idGenerator'));
    await server.register(require('../plugins/repository'));
    await server.register(require('../routes/tasks/getList'), { prefix: 'tasks' });
    await server.register(require('../routes/tasks/postCreate'), { prefix: 'tasks' });
    await server.register(require('../routes/tasks/putAssign'), { prefix: 'tasks' });
    await server.register(require('../routes/tasks/putProgress'), { prefix: 'tasks' });
    await server.register(require('../routes/tasks/putRegress'), { prefix: 'tasks' });
    await server.listen(3000, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
