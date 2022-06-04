import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpInput, SignInInput } from '@infra/user/inputs';
import { GetUserAgent } from '@infra/user/services/decorators';
import { TokenType, UserAgentType } from '@infra/user/types';
import { UserType } from '@infra/user/types';
import { UserService } from '@infra/user/user.service';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '@infra/user/services/guards';

@Resolver(() => UserType)
export class UserResolver {

	constructor (
		private readonly userService: UserService
	) { }

	@Query(() => [UserType])
	@UseGuards(JWTAuthGuard)
	async users (): Promise<Array<UserType>> {
		this.userService;
		return [];
	}

	@Mutation(() => String)
	async signup (
		@Args(SignUpInput.name)
			{ email, password, acceptedTerms }: SignUpInput,
		@GetUserAgent() userAgent: UserAgentType
	): Promise<boolean> {
		await this.userService.signup({
			acceptedTerms,
			email,
			password,
			term: {
				acceptedAt: new Date(),
				ip: '127.0.0.1',
				userAgent
			}
		});
		return true;
	}

	@Mutation(() => TokenType)
	async signin (@Args(SignInInput.name) { email, password }: SignInInput){
		return await this.userService.signin({ email, password });
	}
}