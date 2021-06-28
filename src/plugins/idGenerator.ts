import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { customAlphabet } from 'nanoid';

export type IdGenerator = () => string;

export default fastifyPlugin(async (server: FastifyInstance, options = {}) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 12);
  const idGenerator: IdGenerator = (): string => nanoid();
  server.decorate('idGenerator', idGenerator);
});
