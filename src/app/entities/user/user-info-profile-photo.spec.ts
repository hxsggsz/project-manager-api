import { UserInfoProfilePhoto } from './user-info-profile-photo';

describe('UserInfo Entity', () => {
  it('should create a new userInfoEmail correctly', () => {
    const userProfilePhoto = new UserInfoProfilePhoto('https://image.com');

    expect(userProfilePhoto).toBeTruthy();
    expect(userProfilePhoto.value).toEqual('https://image.com');
  });

  it('should not be able to create a profile photo with an invalid image url', () => {
    expect(() => new UserInfoProfilePhoto('invalid url')).toThrow();
  });

  it('should not be able to create a profile photo without the https protocol', () => {
    expect(() => new UserInfoProfilePhoto('invalidurl.com')).toThrow();
  });
});
