import { AcceptedAtValueObject } from './acceptedAt.valueObject';

describe('acceptedAt.valueObject', () => {
  it('should create a valid acceptedAt', () => {
    const acceptedAt = AcceptedAtValueObject.create('2022-05-27T20:55:00');
    expect(acceptedAt.isSuccess).toBe(true)
    expect(acceptedAt.getResult().value).toBe('2022-05-27T20:55:00')
  })
  it('should fail if provide an invalid acceptedAt', () => {
    const acceptedAt = AcceptedAtValueObject.create('2022-05-2720:55:00');
    expect(acceptedAt.isFailure).toBe(true)
    expect(acceptedAt.error).toBe('Invalid AcceptedAt')
  })
})
