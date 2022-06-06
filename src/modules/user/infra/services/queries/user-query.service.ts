import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@user/infra/entities';
import { IUserQueryService } from '.';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserQueryService implements IUserQueryService{

	constructor (
    @InjectModel(User.name)
		private readonly connection: Model<UserDocument>
	){}
  
	async getUserById (id:string): Promise<User|null> {
		const user = await this.connection.findOne(
			{ id },
			{password:0,_id:false,__v:false}
		);
		return user;
	}
}