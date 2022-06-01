import { IpValueObject, TermValueObject } from '@domain/user/value-objects';
import { DateValueObject, DomainId, EmailValueObject, IUseCase, PasswordValueObject, Result } from 'types-ddd';
import { UserAggregate } from '@domain/user/aggregates';
import { SignupDTO } from './signup.dto';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@repository/user.repository.interface';

export class SignupUseCase implements IUseCase<SignupDTO, Result<void>>{

	constructor (
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository
	) { }

	async execute (dto: SignupDTO): Promise<Result<void, string>> {
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

		if (validateValueObjects.isFailure) return Result.fail(validateValueObjects.error as string);

		const term = TermValueObject.create({
			acceptedAt: acceptedAtOnError.getResult(),
			ip: ipOnError.getResult(),
			userAgent: dto.term.userAgent
		});

		if (term.isFailure)
			return Result.fail(term.error);

		const password = passwordOnError.getResult();

		password.encrypt();

		const user = UserAggregate.create({
			ID: DomainId.create(),
			email: emailOnError.getResult(),
			password,
			terms: [term.getResult()],
		}).getResult();

		const userExistsByEmail = await this.userRepository.exists({
			email: dto.email
		});

		if (userExistsByEmail) return Result.fail('User already exists with the email provided');

		await this.userRepository.save(user);

		return Result.ok(user);
	}
}