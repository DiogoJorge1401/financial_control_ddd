import { Term } from '@infra/user/entities';
import { IUserRepository } from '@repository/user.repository.interface';
import { SignUpDTO } from './signup.dto';
import { SignupUseCase } from './signup.use-case';

describe('signup.use-case', () => {
	let userRepository: IUserRepository;
	let signupUseCase: SignupUseCase;

	type termProps = Partial<Term>;
	interface dtoProps {
		email?: string
		password?: string
		term?: Term
		acceptedTerms?: boolean;
	}
	const makeDto = (dto?: dtoProps, termProps?: termProps): SignUpDTO => {
		return {
			email: 'valid_email@mail.com',
			password: 'valid_password123',
			term: {
				acceptedAt: new Date(),
				ip: '127.0.0.1',
				userAgent: {
					name: 'firefox',
					os: 'LINUX',
					type: 'browser',
					version: '80.0.1',
				},
				...termProps,
			},
			acceptedTerms: true,
			...dto
		};
	};

	beforeEach(() => {
		userRepository = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		};

		signupUseCase = new SignupUseCase(userRepository);
	});

	it('should be defined', () => {
		expect(signupUseCase).toBeDefined();
	});
	it('should fail if not accept the terms', async () => {
		const result = await signupUseCase.execute(
			makeDto({ acceptedTerms: false })
		);
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('Unaccepted terms');
	});
	it('should fail if provided user email already exists', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);
		const result = await signupUseCase.execute(makeDto());
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('User already exists with the email provided');
	});
	it('should save the user successfully', async () => {
		const save = jest.spyOn(userRepository, 'save');
		const result = await signupUseCase.execute(makeDto());
		expect(result.isSuccess).toBe(true);
		expect(save).toBeCalled();
	});
});
