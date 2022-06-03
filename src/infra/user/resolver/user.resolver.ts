import { NotAcceptableException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignUpInput } from '../inputs/user.input';
import { GetUserAgent } from '../services/decorators/get-user-agent.decorator';
import { UserAgentType } from '../types/user-agent.type';
import { UserType } from '../types/user.type';
import { UserService } from '../user.service';

@Resolver(() => UserType)
export class UserResolver {

	constructor (
		private readonly userService: UserService
	) { }

	@Query(() => [UserType])
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
		try {
			if (!acceptedTerms) throw new NotAcceptableException;
			await this.userService.signup({
				email,
				password,
				term: {
					acceptedAt: new Date(),
					ip: '127.0.0.1',
					userAgent
				}
			});
			return true;
		} catch (err: any) {
			return err.message;
		}
	}

}