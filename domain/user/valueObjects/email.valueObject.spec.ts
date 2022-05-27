import { EmailValueObject } from './email.valueObject';

describe('email.valueObject', () => {
  it('should return a valid email', () => {
    const email = EmailValueObject.create("validEmail@mail.com");
    expect(email.isFailure).toBe(false)
  })
  it('should return fail if provide an invalid email', () => {
    const email = EmailValueObject.create("validEmail");
    expect(email.isFailure).toBe(true)
  })
})
