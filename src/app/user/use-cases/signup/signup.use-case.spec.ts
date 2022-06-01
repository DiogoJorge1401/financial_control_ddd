import { IUserRepository } from '@repository/user.repository.interface';
import { SignupUseCase } from './signup.use-case';

describe('signup.use-case', () => {
	let userRepository: IUserRepository
	beforeEach(() => {
		userRepository = {
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn(),
			save: jest.fn(),
		}
	})
	it('should be defined', () => {
		const signupUseCase = new SignupUseCase(userRepository);
		expect(signupUseCase).toBeDefined();
	});
});
