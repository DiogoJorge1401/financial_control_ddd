import { UserAggregate } from '@domain/user/aggregates';
import { User } from '@infra/user/entities';
import { IBaseRepository } from 'types-ddd';

export type IUserRepository = IBaseRepository<UserAggregate, User>;