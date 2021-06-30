import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { customAlphabet } from 'nanoid';

export default fastifyPlugin(async (server: FastifyInstance) => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, 12);
  server.decorate('generateUniqueId', (): string => nanoid());
});

declare module 'fastify' {
  export interface FastifyInstance {
    generateUniqueId(): string;
  }
}
