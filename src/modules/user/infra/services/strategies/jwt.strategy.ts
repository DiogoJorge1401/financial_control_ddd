import { JWT_SECRET_KEY } from '@config/env';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDecoded } from '.';
import { User, UserDocument } from '@user/infra/entities';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
	constructor (
		@InjectModel(User.name)
		private readonly conn: Model<UserDocument>
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_SECRET_KEY
		});
	}

	async validate ({ userID }: PayloadDecoded) {
		const userExists = await this.conn.findOne({ id: userID });
		if (!userExists)
			throw new UnauthorizedException();
		return { userID };
	}
}