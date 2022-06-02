import { UserAggregate } from '@domain/user/aggregates';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from '@repository/user.repository.interface';
import { Model } from 'mongoose';
import { Filter } from 'types-ddd';
import { User } from '../entities/user.schema';
import { UserMapper } from './user.mapper';


export class UserRepository implements IUserRepository {

	constructor (
		@InjectModel(User.name)
		private readonly connection: Model<User>,
		@Inject('UserMapper')
		private readonly mapper: UserMapper
	) { }

	async find (_filter: Filter<Partial<User>>): Promise<UserAggregate[]> {
		this.connection;
		this.mapper
		throw new Error('method not implemented!');
	}
	async findOne (_filter: Filter<Partial<User>>): Promise<UserAggregate> {
		throw new Error('method not implemented!');
	}
	async delete (_filter: Filter<Partial<User>>): Promise<void> {
		throw new Error('method not implemented!');
	}
	async exists (_filter: Filter<Partial<User>>): Promise<boolean> {
		throw new Error('method not implemented!');
	}
	async save (_target: UserAggregate): Promise<void> {
		throw new Error('method not implemented!');
	}
}