import { Module } from '@nestjs/common';
import { SignupUseCase } from '@app/user/use-cases/signup/signup.use-case';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './repository/user.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';

@Module({
	providers: [
		UserMapper,
		{
			provide: 'UserRepository',
			useClass: UserRepository
		},
		SignupUseCase,
		UserService,
		UserResolver
	],
	imports: [
		MongooseModule.forFeature(
			[{ name: User.name, schema: UserSchema }]
		)
	],
})
export class UserModule { }