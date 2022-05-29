import { UniqueEntityID } from '../../shared';
import { ReasonDescriptionValueObject } from '../valueObjects';
import { ReasonDomainEntity } from './reason.domain-entity';

describe('reason.domain-entity', () => {
	it('should create a valid reason entity', () => {
		const reason = ReasonDomainEntity.create(ReasonDescriptionValueObject.create('valid description').getResult());  
		expect(reason.isSuccess).toBe(true);
		expect(reason.getResult().isDeleted).toBe(false);
		expect(reason.getResult().description.value).toBe('valid description');
	});
	it('should create a valid reason entity with provided id', () => {
		const reason = ReasonDomainEntity.create(
			ReasonDescriptionValueObject.create('valid description',).getResult(),
			new UniqueEntityID('1swe3490pl')
		);  
		expect(reason.getResult().id.toValue()).toBe('1swe3490pl');
	});
});
