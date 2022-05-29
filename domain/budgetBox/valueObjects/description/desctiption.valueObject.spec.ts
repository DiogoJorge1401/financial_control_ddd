import { DescriptionValueObject } from './desctiption.valueObject';

describe('description.valueObject', () => {
	it('should create a valid description value object', () => {
		const description = DescriptionValueObject.create('valid description');
		expect(description.isSuccess).toBe(true);
		expect(description.getResult().value).toBe('valid description');
	});
	it('should normalize description to lowercase', () => {
		const description = DescriptionValueObject.create('VALID DESCRIPTION');
		expect(description.isSuccess).toBe(true);
		expect(description.getResult().value).toBe('valid description');
	});
	it('should fail creation if value length is less than 1',()=>{
		const description = DescriptionValueObject.create(' ');
		expect(description.isFailure).toBe(true);
		expect(description.error).toBe('Description must have minimum 1 and max 30 characters');
	});
	it('should fail creation if value length is greater than 30',()=>{
    	const description = DescriptionValueObject.create(
			`
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      `
		);
		expect(description.isFailure).toBe(true);
		expect(description.error).toBe('Description must have minimum 1 and max 30 characters');
	});
});
