import { ERROR_MESSAGES } from '@shared/common';
import { IpValueObject } from './ip.value-object';

describe('ip.value-object', () => {
	it('should create a valid ip', () => {
		const ip = IpValueObject.create('127.0.0.1');
		expect(ip.isSuccess).toBe(true);
		expect(ip.getResult().value).toBe('127.0.0.1');
	});
	it('should fail if provide an invalid ip', () => { 
		const ip = IpValueObject.create('127.02.01.21');
		expect(ip.isFailure).toBe(true);
		expect(ip.error).toBe(ERROR_MESSAGES.USER_INVALID_TERM_IP_FORMAT);
	});
});
