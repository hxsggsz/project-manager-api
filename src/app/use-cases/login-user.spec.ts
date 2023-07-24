import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { LoginUser } from './login-user';
import { makeUser } from '../../../test/factories/user-factory';
import { UserInfoPassword } from '../entities/user/user-info-password';
import * as bcrypt from 'bcrypt';
import { InMemoryJwtService } from '../../../test/repositories/in-memory-jwt-service';

describe('login user UseCase', () => {
  it('should be able to login the user', async () => {
    const inMemoryJwtService = new InMemoryJwtService();
    const userMemoryRepository = new InMemoryUserRepository();
    const loginUserRepository = new LoginUser(
      userMemoryRepository,
      inMemoryJwtService,
    );

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('teste!A1', salt);
    const userCrypto = makeUser({
      password: new UserInfoPassword(hashPassword),
    });
    await userMemoryRepository.create(userCrypto);

    const { access_token } = await loginUserRepository.execute({
      email: userMemoryRepository.userMemory[0].email.value,
      password: 'teste!A1',
    });

    expect(access_token).toBeDefined();
    expect(access_token).toBe('logged');
  });
});
