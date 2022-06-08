import { Inject, Injectable } from '@nestjs/common';
import { UserAggregate } from '@user/domain/aggregate';
import { IUserRepository } from '@user/domain/interfaces';
import { IpValueObject, TermValueObject } from '@user/domain/value-object';
import { DateValueObject, DomainId, EmailValueObject, IUseCase, PasswordValueObject, Result } from 'types-ddd';
import { SignUpDTO } from './signup.dto';

@Injectable()
export class SignupUseCase implements IUseCase<SignUpDTO, Result<void>>{

	constructor (
		@Inject('UserRepository')
		private readonly userRepository: IUserRepository
	) { }

	async execute (dto: SignUpDTO): Promise<Result<void, string>> {
		const emailOnError = EmailValueObject.create(dto.email);
		const passwordOnError = PasswordValueObject.create(dto.password);
		const acceptedAtOnError = DateValueObject.create(dto.term.acceptedAt);
		const ipOnError = IpValueObject.create(dto.term.ip);

		const validateValueObjects = Result.combine<any>([
			emailOnError,
			passwordOnError,
			acceptedAtOnError,
			ipOnError
		]);

		if (validateValueObjects.isFailure) return Result.fail(validateValueObjects.errorValue(), 'BAD_REQUEST');

		const termOrError = TermValueObject.create({
			isAccepted: dto.acceptedTerms,
			acceptedAt: acceptedAtOnError.getResult(),
			ip: ipOnError.getResult(),
			userAgent: dto.term.userAgent
		});

		if (termOrError.isFailure) return Result.fail(termOrError.error);

		const password = passwordOnError.getResult();

		password.encrypt();

		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: emailOnError.getResult(),
			password,
			terms: [termOrError.getResult()],
		}).getResult();

		const userExistsByEmail = await this.userRepository.exists({
			email: dto.email
		});

		if (userExistsByEmail) return Result.fail('User already exists with the email provided', 'BAD_REQUEST');

		await this.userRepository.save(user);

		return Result.ok(null);
	}
}