import { SignInInput, SignUpInput } from '@infra/user/inputs';
import { GetUserAgent, GetUserId, GetUserIp } from '@infra/user/services/decorators';
import { JWTAuthGuard } from '@infra/user/services/guards';
import { TokenType, UserAgentType, UserType } from '@infra/user/types';
import { UserService } from '@infra/user/user.service';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => UserType)
export class UserResolver {

	constructor (
		private readonly userService: UserService
	) { }

	@Query(() => String)
	@UseGuards(JWTAuthGuard)
	async whoAmI (@GetUserId() userId: string): Promise<string> {
		userId;
		return 'user';
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