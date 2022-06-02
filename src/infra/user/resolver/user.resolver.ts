import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from '../inputs/user.input';
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

	@Mutation(() => Boolean)
	async signup (@Args(UserInput.name) user: UserInput): Promise<boolean> {
		try {
			const result = (await this.userService.signup({ ...user, term: null })).getResult();
			return result;
		} catch (err) {
			return false;
		}
	}

}