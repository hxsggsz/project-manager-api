import { UserInfoUsername } from './user-info-username';

describe('UserInfo Entity', () => {
  it('should create a new UserInfoUsername correctly', () => {
    const userName = new UserInfoUsername('username');

    expect(userName).toBeTruthy();
    expect(userName.value).toEqual('username');
  });

  it('should not be able to create a username with length less than 2', () => {
    expect(() => new UserInfoUsername('te')).toThrow();
  });

  it('should not be able to create a username with length bigger than 8', () => {
    expect(() => new UserInfoUsername('a'.repeat(16))).toThrow();
  });
});
