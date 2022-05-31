import { IGenericRepository } from '@repositories/shared';
import { IUserPersistence } from './user-persistence.interface';

export interface IUserRepository<ORM> extends IGenericRepository<IUserPersistence> {
  getConnection(): ORM
}