import { JWTPayload, SignInDTO, SignInUseCase } from '@app/user/use-cases/sign-in';
import { SignUpDTO, SignupUseCase } from '@app/user/use-cases/sign-up';
import { Injectable } from '@nestjs/common';
import { CheckResultInterceptor } from '@utils/check-result.interceptor';

@Injectable()
export class UserService {

	constructor (
		private readonly signupUseCase: SignupUseCase,
		private readonly signinUseCase: SignInUseCase
	) { }

	async signup (dto: SignUpDTO): Promise<void> {
		CheckResultInterceptor(await this.signupUseCase.execute(dto));
		return;
	}

	async signin (dto: SignInDTO): Promise<JWTPayload> {
		const result = CheckResultInterceptor(await this.signinUseCase.execute(dto));		
		return result.getResult();
	}
}