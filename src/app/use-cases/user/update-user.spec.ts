import { makeUser } from '../../../../test/factories/user-factory';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { UpdateUser } from './update-user';
import { UserNotFound } from '../errors/user-not-found';

describe('update user UseCase', () => {
  it('should be able to update the user', async () => {
    const userMemoryRepository = new InMemoryUserRepository();
    const updateUserRepository = new UpdateUser(userMemoryRepository);

    const user = makeUser();
    await userMemoryRepository.create(user);

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0]).toEqual(user);

    const newUser = makeUser({
      name: 'updateName',
      username: 'updateUser',
    });

    const userToUpdate = {
      id: user.id,
      name: newUser.name,
      username: newUser.username,
      profilePhoto: newUser.profilePhoto,
    };

    await updateUserRepository.execute(userToUpdate);

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0].name).toEqual(userToUpdate.name);
    expect(userMemoryRepository.userMemory[0].username).toEqual(
      userToUpdate.username,
    );
    expect(userMemoryRepository.userMemory[0].profilePhoto).toEqual(
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
      name: 'updateName',
      username: 'updateUser',
    });

    const userToUpdate = {
      id: 'invalid-id',
      name: newUser.name,
      username: newUser.username,
      profilePhoto: newUser.profilePhoto,
    };

    expect(
      async () => await updateUserRepository.execute(userToUpdate),
    ).rejects.toThrow(UserNotFound);
  });
});
