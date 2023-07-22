import { CreateUser } from './create-user';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { UserAlreadyRegistered } from './errors/user-already-registered';

describe('create user UseCase', () => {
  it('should be able to create a new user', async () => {
    const userMemoryRepository = new InMemoryUserRepository();
    const userRepository = new CreateUser(userMemoryRepository);

    const { user } = await userRepository.execute({
      name: 'test',
      username: 'username',
      email: 'test@gmail.com',
      profilePhoto: 'https://image.com',
      password: 'password!A1',
    });

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0]).toEqual(user);
  });
  // criar um usuario em memoria e testar se o tentar criar outro usuário com o mesmo email vai dar erro.

  it('should not create a user with email registered before', async () => {
    const userMemoryRepository = new InMemoryUserRepository();
    const userRepository = new CreateUser(userMemoryRepository);

    const { user } = await userRepository.execute({
      name: 'test',
      username: 'username',
      email: 'test@gmail.com',
      profilePhoto: 'https://image.com',
      password: 'password!A1',
    });

    expect(userMemoryRepository.userMemory).toHaveLength(1);
    expect(userMemoryRepository.userMemory[0]).toEqual(user);

    expect(
      async () =>
        await userRepository.execute({
          name: 'test',
          username: 'username',
          email: 'test@gmail.com',
          profilePhoto: 'https://image.com',
          password: 'password!A1',
        }),
    ).rejects.toThrow(UserAlreadyRegistered);
    expect(userMemoryRepository.userMemory).toHaveLength(1);
  });
});
