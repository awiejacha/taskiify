import { FastifyInstance } from 'fastify';
import { IdGenerator } from '../plugins/idGenerator';
import Repository from '../Domain/Repository';

export default interface DecoratedFastifyInstance extends FastifyInstance{
  idGenerator: IdGenerator;
  repository: Repository;
}
