import { UserAggregate } from '@user/domain/aggregate';
import { User } from '@user/infra/entities';
import { IBaseRepository } from 'types-ddd';

export type IUserRepository = IBaseRepository<UserAggregate, User>;