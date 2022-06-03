import { SignUpDTO } from '@app/user/use-cases/signup/signup.dto';
import { SignupUseCase } from '@app/user/use-cases/signup/signup.use-case';
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