import { UserInfoName } from './user-info-name';

describe('UserInfo Entity', () => {
  it('should create a new userInfoEmail correctly', () => {
    const userName = new UserInfoName('test');

    expect(userName).toBeTruthy();
    expect(userName.value).toEqual('test');
  });

  it('should not be able to create a name with length less than 2', () => {
    expect(() => new UserInfoName('te')).toThrow();
  });

  it('should not be able to create a name with length bigger than 8', () => {
    expect(() => new UserInfoName('a'.repeat(9))).toThrow();
  });
});
