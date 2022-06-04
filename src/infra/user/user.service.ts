import { SignUpDTO } from '@app/user/use-cases/sign-up/signup.dto';
import { SignupUseCase } from '@app/user/use-cases/sign-up/signup.use-case';
import { Injectable, PreconditionFailedException } from '@nestjs/common';

@Injectable()
export class UserService {

	constructor (
		private readonly signupUseCase: SignupUseCase
	) { }

	async signup (dto: SignUpDTO): Promise<void> {
		const result = await this.signupUseCase.execute(dto);

		if (result.isFailure) throw new PreconditionFailedException(result.error);
		
		return;
	}
}