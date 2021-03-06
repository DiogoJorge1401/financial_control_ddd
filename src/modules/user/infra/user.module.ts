import { SignInUseCase } from '@user/app/use-cases/sign-in';
import { SignupUseCase } from '@user/app/use-cases/sign-up';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JWT_SECRET_KEY } from '@config/env';
import { User, UserSchema } from './entities';
import { UserMapper, UserRepository } from './repository';
import { UserResolver } from './resolver/user.resolver';
import { JWTStrategy } from './services/strategies';
import { UserService } from './user.service';
import { UserQueryService } from './services/queries';

@Module({
	providers: [
		UserMapper,
		{ provide: 'UserRepository', useClass: UserRepository },
		{ provide: 'UserQueryService', useClass: UserQueryService },
		SignupUseCase, 
		SignInUseCase,
		UserService,
		UserResolver,
		JWTStrategy,
	],
	imports: [
		PassportModule,
		JwtModule.register({ secret: JWT_SECRET_KEY, signOptions: { expiresIn: '1h' }, }),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
})
export class UserModule { }