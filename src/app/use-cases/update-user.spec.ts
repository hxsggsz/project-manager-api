import { makeUser } from '../../../test/factories/user-factory';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { UserInfoName } from '../entities/user/user-info-name';
import { UserInfoUsername } from '../entities/user/user-info-username';
import { UpdateUser } from './update-user';
import { UserNotFound } from './errors/user-not-found';

describe('update user UseCase', () => {
  it('should be able to update the user', async () => {
    const userMemoryRepository = new InMemoryUserRepository();
    const updateUserRepository = new UpdateUser(userMemoryRepository);

    const user = makeUser();
    await userMemoryRepository.create(user);

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0]).toEqual(user);

    const newUser = makeUser({
      name: new UserInfoName('updateName'),
      username: new UserInfoUsername('updateUser'),
    });

    const userToUpdate = {
      id: user.id,
      name: newUser.name.value,
      username: newUser.username.value,
      profilePhoto: newUser.profilePhoto.value,
    };

    await updateUserRepository.execute(userToUpdate);

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0].name.value).toEqual(
      userToUpdate.name,
    );
    expect(userMemoryRepository.userMemory[0].username.value).toEqual(
      userToUpdate.username,
    );
    expect(userMemoryRepository.userMemory[0].profilePhoto.value).toEqual(
      userToUpdate.profilePhoto,
    );
  });

  it('should not be able to update the user with invalid id', async () => {
    const userMemoryRepository = new InMemoryUserRepository();
    const updateUserRepository = new UpdateUser(userMemoryRepository);

    const user = makeUser();
    await userMemoryRepository.create(user);

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0]).toEqual(user);

    const newUser = makeUser({
      name: new UserInfoName('updateName'),
      username: new UserInfoUsername('updateUser'),
    });

    const userToUpdate = {
      id: 'invalid-id',
      name: newUser.name.value,
      username: newUser.username.value,
      profilePhoto: newUser.profilePhoto.value,
    };

    expect(
      async () => await updateUserRepository.execute(userToUpdate),
    ).rejects.toThrow(UserNotFound);
  });
});
