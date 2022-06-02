import { UserAggregate } from '@domain/user/aggregates';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '@repository/user.repository.interface';
import { Model } from 'mongoose';
import { User } from '../entities/user.schema';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {

	constructor (
		private readonly connection: Model<User>,
		private readonly mapper: UserMapper
	) {
		this.connection;
		this.mapper;
	}

	async find (): Promise<Array<UserAggregate>> {
		throw new Error('method not implemented!');
	}
	async findOne (): Promise<UserAggregate> {
		throw new Error('method not implemented!');
	}
	async delete (): Promise<void> {
		throw new Error('method not implemented!');
	}
	async exists (): Promise<boolean> {
		throw new Error('method not implemented!');
	}
	async save (): Promise<void> {
		throw new Error('method not implemented!');
	}
}