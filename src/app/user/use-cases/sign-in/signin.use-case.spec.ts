import { ERROR_MESSAGES } from '@domain/shared/utils';
import { UserAggregate } from '@domain/user/aggregates';
import { IUserRepository } from '@repository/user.repository.interface';
import { DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { SignInUseCase } from './signin.use-case';

describe('SignInUseCase', () => {
	let signInUseCase: SignInUseCase;
	let userRepository: IUserRepository;
	let user: UserAggregate;

	beforeAll(() => {
		user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('validmail@mail.com').getResult(),
			password: PasswordValueObject.create('validPassword123').getResult(),
			terms: []
		}).getResult();
	});

	beforeEach(() => {
		userRepository = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		signInUseCase = new SignInUseCase(userRepository);
	});

	it('should be defined', () => {
		expect(signInUseCase).toBeDefined();
	});
	it('should fail if provide an invalid email', async () => {
		const result = await signInUseCase.execute({
			email: '',
			password: 'valid_password123'
		});
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('Invalid email');
	});
	it('should fail if provide an invalid password', async () => {
		const result = await signInUseCase.execute({
			email: 'validemail@mail.com',
			password: ''
		});
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('Password must has min 5 and max 21 chars');
	});
	it('should fail if not found user by email', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);
		const result = await signInUseCase.execute({
			email: 'notexists@mail.com',
			password: 'valid_password123'
		});
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS);
	});
	it('should fail if provided password does not match', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);
		jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

		const result = await signInUseCase.execute({
			email: 'validmail@mail.com',
			password: 'invalid_password123'
		});

		expect(result.isFailure).toBe(true);
		expect(result.error).toBe(ERROR_MESSAGES.SIGNIN_INVALID_CREDENTIALS);
	});
});
