import { UserMock } from './mock';
;

describe('user.aggregate', () => {

	const userMock = new UserMock();

	it('should create a valid user', () => {
		const user = userMock.domain();
		expect(user.isSuccess).toBe(true);
	});
	it('should be able get valid values', () => {
		const user = userMock.domain();
		const userResult = user.getResult();

		expect(userResult.email.value).toBe('validmail@mail.com');
		expect(userResult.password.value).toBe('validPassword');
		expect(userResult.terms[0].ip.value).toBe('127.0.0.1');
		expect(userResult.terms[0].userAgent).toEqual({
			name: 'firefox',
			os: 'LINUX',
			type: 'browser',
			version: "86.0.1",
		});
	});
	it('should create a valid user with provided id', () => {
		const user = userMock.domain({ id: 'valid_id' });
		expect(user.isSuccess).toBe(true);
		expect(user.getResult().id.toValue()).toBe('valid_id');
	});
});