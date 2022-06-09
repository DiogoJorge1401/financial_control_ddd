import { ERROR_MESSAGES } from '@shared/utils';
import { IUserRepository } from '@user/domain/interfaces';
import { SignUpDTO } from './signup.dto';
import { SignupUseCase } from './signup.use-case';

describe('signup.use-case', () => {
	let userRepository: IUserRepository;
	let signupUseCase: SignupUseCase;
	interface dtoProps {
		acceptedTerms?: boolean,
		email?: string,
		password?: string,
		acceptedAt?: Date,
		ip?: string,
		name?: string,
		os?: string,
		type?: string,
		version?: string;
	}

	const makeDto = (props: dtoProps): SignUpDTO => {
		return {
			acceptedTerms: props.acceptedTerms ?? true,
			email: props.email ?? 'valid_email@domain.com',
			password: props.password ?? 'valid_password',
			term: {
				acceptedAt: props.acceptedAt ?? new Date('2022-01-01'),
				isAccepted: undefined,
				ip: props.ip ?? '123.123.123.123',
				userAgent: {
					name: props.name ?? 'firefox',
					os: props.os ?? 'Linux',
					type: props.type ?? 'browser',
					version: props.version ?? '86.1'
				}
			}
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
		expect(result.error).toBe('Terms must be accepted');
	});
	it('should fail if provided user email already exists', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);
		const result = await signupUseCase.execute(makeDto({ email: 'invalidmail@mail.com' }));
		expect(result.isFailure).toBe(true);
		expect(result.error).toBe('User already exists with the email provided');
	});
	it('should save the user successfully', async () => {
		const save = jest.spyOn(userRepository, 'save');
		const result = await signupUseCase.execute(makeDto({ email: 'invalidmail@mail.com' }));
		expect(result.isSuccess).toBe(true);
		expect(save).toBeCalled();
	});
	it('should fail if some value provided is invalid', async () => {
		jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(true);
		const dto = makeDto({});
		const result = await signupUseCase.execute(
			{
				...dto,
				term: { ...dto.term, ip: 'invalid_ip' }
			}
		);
		expect(result.isFailure).toBe(true);
		expect(result.errorValue()).toBe(ERROR_MESSAGES.USER_INVALID_TERM_IP_FORMAT);
	});
});
