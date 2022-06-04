import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IUserRepository } from '@repository/user.repository.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDecoded } from '.';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor (
		@Inject('UserRepository')
		private readonly userRepository:IUserRepository
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'secret'
		});
	}

	async validate ({ userID }: PayloadDecoded){
		const userExists = await this.userRepository.findOne({ id: userID });
		if(!userExists)
			throw new UnauthorizedException();
		return { userID };
	}
}