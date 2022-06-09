import { UserAggregate } from '@user/domain/aggregate';
import { IBaseRepository } from 'types-ddd';
import { IUser } from '@shared/interfaces';

export type IUserRepository = IBaseRepository<UserAggregate, IUser>;