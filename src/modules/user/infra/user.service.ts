import { Inject, Injectable } from '@nestjs/common';
import { JWTPayload, SignInDTO, SignInUseCase } from '@user/app/use-cases/sign-in';
import { SignUpDTO, SignupUseCase } from '@user/app/use-cases/sign-up';
import { IUserQueryService } from '@user/infra/services/queries';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';

@Injectable()
export class UserService {

	constructor (
		private readonly signupUseCase: SignupUseCase,
		private readonly signinUseCase: SignInUseCase,
		@Inject('UserQueryService')
		private readonly _query:IUserQueryService
	) { }

	async signup (dto: SignUpDTO): Promise<void> {
		CheckResultInterceptor(await this.signupUseCase.execute(dto));
		return;
	}

	async signin (dto: SignInDTO): Promise<JWTPayload> {
		const result = CheckResultInterceptor(await this.signinUseCase.execute(dto));		
		return result.getResult();
	}

	get query ():IUserQueryService{
		return this._query;
	}
}