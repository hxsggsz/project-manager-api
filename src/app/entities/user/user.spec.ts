import { User } from './user';
import { UserInfoEmail } from './user-info-email';
import { UserInfoName } from './user-info-name';
import { UserInfoPassword } from './user-info-password';
import { UserInfoProfilePhoto } from './user-info-profile-photo';
import { UserInfoUsername } from './user-info-username';

describe('user entity', () => {
  it('should create the user entity correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const user = new User({
      name: new UserInfoName('test'),
      username: new UserInfoUsername('username'),
      email: new UserInfoEmail('test@gmail.com'),
      password: new UserInfoPassword('teste!A1'),
      profilePhoto: new UserInfoProfilePhoto('https://image.com'),
      createdAt: date as unknown as Date,
    });

    expect(user).toBeTruthy();
    expect(user.name.value).toEqual('test');
    expect(user.username.value).toEqual('username');
    expect(user.email.value).toEqual('test@gmail.com');
    expect(user.password.value).toEqual('teste!A1');
    expect(user.profilePhoto.value).toEqual('https://image.com');
    expect(user.createdAt).toEqual(date);
  });

  it('should create the user entity and update it correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const user = new User({
      name: new UserInfoName('test'),
      username: new UserInfoUsername('username'),
      email: new UserInfoEmail('test@gmail.com'),
      password: new UserInfoPassword('teste!A1'),
      profilePhoto: new UserInfoProfilePhoto('https://image.com'),
      createdAt: date as unknown as Date,
    });

    expect(user).toBeTruthy();
    expect(user.name.value).toEqual('test');
    expect(user.username.value).toEqual('username');
    expect(user.email.value).toEqual('test@gmail.com');
    expect(user.password.value).toEqual('teste!A1');
    expect(user.profilePhoto.value).toEqual('https://image.com');
    expect(user.createdAt).toEqual(date);

    user.updateUser(
      new UserInfoUsername('new username'),
      new UserInfoName('new name'),
      new UserInfoProfilePhoto('https://newPhoto.com'),
    );

    expect(user.name.value).toEqual('new name');
    expect(user.username.value).toEqual('new username');
    expect(user.profilePhoto.value).toEqual('https://newPhoto.com');
  });
});
