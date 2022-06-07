import { ERROR_MESSAGES } from '@shared/utils';
import { UserAggregate } from '@user/domain/aggregate';
import { JwtService } from '@nestjs/jwt';
import { DomainId, EmailValueObject, PasswordValueObject } from 'types-ddd';
import { SignInUseCase } from './signin.use-case';
import { IUserRepository } from '@user/domain/interfaces';

describe('SignInUseCase', () => {
	let signInUseCase: SignInUseCase;
	let userRepository: IUserRepository;
	let user: UserAggregate;
	let jwtService: JwtService;

	beforeAll(() => {
		user = UserAggregate.create({
			ID: DomainId.create(),
			email: EmailValueObject.create('validmail@mail.com').getResult(),
			password: PasswordValueObject.create('validPassword123').getResult(),
			terms: []
		}).getResult();

		jwtService = {
			sign: () => 'token'
		} as unknown as JwtService;

	});

	beforeEach(() => {
		userRepository = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		signInUseCase = new SignInUseCase(userRepository, jwtService);
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

	it('should return a token payload if provide valid credentials', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);
		jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

		const result = await signInUseCase.execute({
			email: 'validmail@mail.com',
			password: 'validPassword123'
		});

		expect(result.isSuccess).toBe(true);
		expect(result.getResult().token).toBe('token');
	});

	it('should return internal server error if use case throws', async () => {
		jest.spyOn(userRepository, 'findOne').mockImplementationOnce(async () => { throw new Error(); });


		const result = await signInUseCase.execute({
			email: 'validmail@mail.com',
			password: 'validPassword123'
		});

		expect(result.errorValue()).toBe('Internal Server Error');
	});

});
