import { SignInUseCase } from '@app/user/use-cases/sign-in';
import { SignupUseCase } from '@app/user/use-cases/sign-up';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './entities';
import { UserMapper, UserRepository } from './repository';
import { UserResolver } from './resolver/user.resolver';
import { JWTStrategy } from './services/strategies';
import { UserService } from './user.service';



@Module({
	providers: [
		{ provide: 'UserRepository', useClass: UserRepository },
		JWTStrategy,
		UserMapper,
		SignupUseCase,
		SignInUseCase,
		UserService,
		UserResolver
	],
	imports: [
		PassportModule,
		JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' }, }),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
})
export class UserModule { }