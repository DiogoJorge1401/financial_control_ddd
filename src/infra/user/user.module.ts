import { Module } from '@nestjs/common';
import { SignupUseCase } from '@app/user/use-cases/sign-up/signup.use-case';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './repository/user.mapper';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { SignInUseCase } from '@app/user/use-cases/sign-in/signin.use-case';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './services/strategies/jwt.strategy';

@Module({
	providers: [
		JWTStrategy,
		UserMapper,
		{ provide: 'UserRepository', useClass: UserRepository },
		SignupUseCase,
		SignInUseCase,
		UserService,
		UserResolver
	],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' }, })
	],
})
export class UserModule { }