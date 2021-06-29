import { FastifyInstance } from 'fastify';
import Repository from '../Domain/Repository';
import { IdGenerator } from '../plugins/idGenerator';

export default interface TaskiifyInstance extends FastifyInstance{
  idGenerator: IdGenerator;
  repository: Repository;
}
