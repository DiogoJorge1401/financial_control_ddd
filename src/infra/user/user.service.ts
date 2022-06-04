import { JWTPayload, SignInDTO, SignInUseCase } from '@app/user/use-cases/sign-in';
import { SignUpDTO } from '@app/user/use-cases/sign-up';
import { SignupUseCase } from '@app/user/use-cases/sign-up/signup.use-case';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

	constructor (
		private readonly signupUseCase: SignupUseCase,
		private readonly signinUseCase: SignInUseCase
	) { }

	async signup (dto: SignUpDTO): Promise<void> {
		const result = await this.signupUseCase.execute(dto);

		if (result.isFailure) throw new BadRequestException(result.error);

		return;
	}

	async signin (dto: SignInDTO): Promise<JWTPayload> {
		const result = await this.signinUseCase.execute(dto);

		if(result.isFailure) throw new BadRequestException(result.error);
		
		return result.getResult();
	}
}