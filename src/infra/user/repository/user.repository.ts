import { UserAggregate } from '@domain/user/aggregates';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from '@repository/user.repository.interface';
import { Model } from 'mongoose';
import { Filter } from 'types-ddd';
import { User, UserDocument } from '@infra/user/entities';
import { UserMapper } from '.';

@Injectable()
export class UserRepository implements IUserRepository {

	constructor (
		@InjectModel(User.name)
		private readonly connection: Model<UserDocument>,
		private readonly mapper: UserMapper
	) { }
	async find (filter: Filter<Partial<User>>): Promise<UserAggregate[]> {
		return [this.mapper.map(filter as any).getResult()];
	}
	async findOne (filter: Filter<Partial<User>>): Promise<UserAggregate> {
		const user = await this.connection.findOne(filter);

		if (!user) return null;

		const userAggregate = this.mapper.map(user).getResult();

		return userAggregate;
	}
	async delete (filter: Filter<Partial<User>>): Promise<void> {
		filter;
		throw new Error('method not implemented');
	}
	async exists (filter: Filter<Partial<User>>): Promise<boolean> {
		const userExists = await this.connection.exists(filter);
		return !!userExists;
	}
	async save (target: UserAggregate): Promise<void> {
		try {
			const user = new this.connection(target.ToObject());
			await user.save();
		} catch (err) {
			console.log(err);
		}

	}


}