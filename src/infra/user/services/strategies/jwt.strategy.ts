import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDecoded } from './payload-decoded.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'secret'
		});
	}

	async valdate (payload: PayloadDecoded) {
		return { userID: payload.userID };
	}
}