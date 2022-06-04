import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@repository/user.repository.interface';
import { EmailValueObject, IUseCase, PasswordValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@domain/shared/utils';
import { SignInDTO } from './signin.dto';

@Injectable()
export class SignInUseCase implements IUseCase<SignInDTO, Result<void>>{
	constructor (
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository
	) {
		this.userRepository;
	}
	async execute (dto: SignInDTO): Promise<Result<void, string>> {
		const { email, password } = dto;
		const emailOnError = EmailValueObject.create(email);
		const passwordOnError = PasswordValueObject.create(password);

		const validateValueObjects = Result.combine<any>([
			emailOnError,
			passwordOnError
		]);

		if (validateValueObjects.isFailure) return Result.fail<void>(validateValueObjects.error.toString());


		const userExistsByEmail = await this.userRepository.exists({
			email
		});

		if (!userExistsByEmail) return Result.fail(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS);


		const user = await this.userRepository.findOne({email});

		const passwordsMatch = user.password.compare(password);

		if (!passwordsMatch) return Result.fail(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS);

		return Result.ok(null);
	}


}