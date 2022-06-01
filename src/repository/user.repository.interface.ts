import { UserAggregate } from '@domain/user/aggregates'
import { User } from '@infra/user/entities/user.schema'
import { IBaseRepository } from 'types-ddd'

export interface IUserRepository extends IBaseRepository<UserAggregate, User> { }