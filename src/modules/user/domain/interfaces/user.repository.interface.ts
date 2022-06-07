import { UserAggregate } from '@user/domain/aggregate';
import { IBaseRepository } from 'types-ddd';
import { IUser } from '@shared/interfaces/user-model-interface';

export type IUserRepository = IBaseRepository<UserAggregate, IUser>;