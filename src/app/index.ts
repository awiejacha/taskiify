import { fastify, FastifyInstance } from 'fastify';

const server: FastifyInstance = fastify();

(async () => {
  try {
    await server.register(require('../plugins/idGenerator'));
    await server.register(require('../plugins/repository'));
    await server.register(require('../schemas'));
    await server.register(require('../routes'));
    await server.listen(3000, '0.0.0.0');
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
})();
