import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpInput } from '@infra/user/inputs/user.input';
import { GetUserAgent } from '@infra/user/services/decorators/get-user-agent.decorator';
import { UserAgentType } from '@infra/user/types/user-agent.type';
import { UserType } from '@infra/user/types/user.type';
import { UserService } from '@infra/user/user.service';
import { UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../services/guards/jwt.guard';

@Resolver(() => UserType)
export class UserResolver {

	constructor (
		private readonly userService: UserService
	) { }

	@Query(() => [UserType])
	@UseGuards(JWTAuthGuard)
	async users (): Promise<Array<UserType>> {
		this.userService;
		return [
			{
				id: 'z1t6iyrQVV7o6lM5XfucTQ5YBR',
				email: 'enja@egejacen.ar',
				terms: [
					{
						acceptedAt: new Date(),
						ip: '176.64.184.75',
						userAgent: {
							name: 'firefox',
							os: 'LINUX',
							type: 'browser',
							version: '80.0.1',
						}
					}
				]
			}
		];
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
}