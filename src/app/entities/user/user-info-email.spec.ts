import { UserInfoEmail } from './user-info-email';

describe('UserInfo Entity', () => {
  it('should create a new userInfoEmail correctly', () => {
    const userEmail = new UserInfoEmail('test@gmail.com');

    expect(userEmail).toBeTruthy();
    expect(userEmail.value).toEqual('test@gmail.com');
  });

  it('should not be able to create an invalid email', () => {
    expect(() => new UserInfoEmail('test')).toThrow();
  });
});
