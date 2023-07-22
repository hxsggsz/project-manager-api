import { CreateUser } from './create-user';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';

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
});
