import { UserInfoPassword } from './user-info-password';

describe('UserInfo Entity', () => {
  it('should create a new userInfoEmail correctly', () => {
    const userPassword = new UserInfoPassword('test1A@');

    expect(userPassword).toBeTruthy();
    expect(userPassword.value).toEqual('test1A@');
  });

  it('should not be able to create a password without uppercase letter', () => {
    expect(() => new UserInfoPassword('simplepassword')).toThrow();
  });

  it('should not be able to create a password withou special character', () => {
    expect(() => new UserInfoPassword('passwordUpper')).toThrow();
  });

  it('should not be able to create a password without number', () => {
    expect(() => new UserInfoPassword('password!')).toThrow();
  });

  it('should not be able to create a name with length bigger than 8', () => {
    expect(() => new UserInfoPassword('password123')).toThrow();
  });
});
