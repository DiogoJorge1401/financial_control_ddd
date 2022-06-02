import { Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../types/user.type';

@Resolver(() => UserType)
export class UserResolver {

	@Query(() => [UserType])
	async users(): Promise<Array<UserType>> {
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

}