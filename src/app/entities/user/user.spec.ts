import { User } from './user';

describe('user entity', () => {
  it('should create the user entity correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const user = new User({
      name: 'test',
      username: 'username',
      email: 'test@gmail.com',
      password: 'teste!A1',
      profilePhoto: 'https://image.com',
      createdAt: date as unknown as Date,
    });

    expect(user).toBeTruthy();
    expect(user.name).toEqual('test');
    expect(user.username).toEqual('username');
    expect(user.email).toEqual('test@gmail.com');
    expect(user.password).toEqual('teste!A1');
    expect(user.profilePhoto).toEqual('https://image.com');
    expect(user.createdAt).toEqual(date);
  });

  it('should create the user entity and update it correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const user = new User({
      name: 'test',
      username: 'username',
      email: 'test@gmail.com',
      password: 'teste!A1',
      profilePhoto: 'https://image.com',
      createdAt: date as unknown as Date,
    });

    expect(user).toBeTruthy();
    expect(user.name).toEqual('test');
    expect(user.username).toEqual('username');
    expect(user.email).toEqual('test@gmail.com');
    expect(user.password).toEqual('teste!A1');
    expect(user.profilePhoto).toEqual('https://image.com');
    expect(user.createdAt).toEqual(date);

    user.updateUser('new username', 'new name', 'https://newPhoto.com');

    expect(user.name).toEqual('new name');
    expect(user.username).toEqual('new username');
    expect(user.profilePhoto).toEqual('https://newPhoto.com');
  });
});
