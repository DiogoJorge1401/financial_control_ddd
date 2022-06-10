import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignInInput, SignUpInput } from '@user/infra/inputs';
import { GetUserAgent, GetUserId, GetUserIp } from '@user/infra/services/decorators';
import { JWTAuthGuard } from '@user/infra/services/guards';
import { TokenType, UserAgentType, UserType } from '@user/infra/types';
import { UserService } from '@user/infra/user.service';

@Resolver(() => UserType)
export class UserResolver {

	constructor (
		private readonly userService: UserService,
	) { }

	@Query(() => UserType, { nullable: true })
	@UseGuards(JWTAuthGuard)
	async whoAmI (@GetUserId() userId: string): Promise<UserType> {
		;
		const user = await this.userService.query.getUserById(userId);
		return user;
	}

	@Mutation(() => String)
	async signup (
		@Args(SignUpInput.name)
			{ email, password, acceptedTerms }: SignUpInput,
		@GetUserAgent() userAgent: UserAgentType,
		@GetUserIp() ip: string
	): Promise<boolean> {
		await this.userService.signup({
			acceptedTerms,
			email,
			password,
			term: {
				acceptedAt: new Date(),
				ip,
				userAgent
			}
		});
		return true;
	}

	@Mutation(() => TokenType)
	async signin (@Args(SignInInput.name) { email, password }: SignInInput) {
		return await this.userService.signin({ email, password });
	}
}