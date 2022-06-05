import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '@repository/user.repository.interface';
import { EmailValueObject, IUseCase, PasswordValueObject, Result } from 'types-ddd';
import { ERROR_MESSAGES } from '@domain/shared/utils';
import { SignInDTO } from './signin.dto';
import { JWTPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInUseCase implements IUseCase<SignInDTO, Result<JWTPayload>>{
	constructor (
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository,
		@Inject(JwtService)
		private readonly jwt: JwtService
	) {
		this.userRepository;
	}
	async execute (dto: SignInDTO): Promise<Result<JWTPayload, string>> {
		const { email, password } = dto;
		const emailOnError = EmailValueObject.create(email);
		const passwordOnError = PasswordValueObject.create(password);

		const validateValueObjects = Result.combine<any>([
			emailOnError,
			passwordOnError
		]);

		if (validateValueObjects.isFailure) return Result.fail(validateValueObjects.error.toString(), 'BAD_REQUEST');

		try {
			const userExistsByEmail = await this.userRepository.exists({
				email
			});

			if (!userExistsByEmail) return Result.fail(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS, 'BAD_REQUEST');

			const user = await this.userRepository.findOne({ email });

			const passwordsMatch = user.password.compare(password);

			if (!passwordsMatch) return Result.fail(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS, 'BAD_REQUEST');

			const token = this.jwt.sign({ userID: user.id.toString() });

			return Result.ok<JWTPayload>({
				token
			});
		} catch (err) {
			return Result.fail(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS, 'BAD_REQUEST');
		}
	}


}