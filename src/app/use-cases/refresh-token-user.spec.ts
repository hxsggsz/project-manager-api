import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { makeUser } from '../../../test/factories/user-factory';
import { InMemoryJwtService } from '../../../test/repositories/in-memory-jwt-service';
import { RefreshToken } from './refresh-token-user';
import { UserInfoEmail } from '../entities/user/user-info-email';

describe('refresh token user UseCase', () => {
  it('should be able to recive a new refresh token', async () => {
    const inMemoryJwtService = new InMemoryJwtService();
    const userMemoryRepository = new InMemoryUserRepository();
    const refreshTokenRepository = new RefreshToken(
      userMemoryRepository,
      inMemoryJwtService,
    );

    const user = makeUser();
    await userMemoryRepository.create(user);

    const { refreshToken } = await refreshTokenRepository.execute({
      refresh_token: 'validToken',
    });

    expect(refreshToken).toBeDefined();
    expect(async () =>
      refreshTokenRepository.execute({
        refresh_token: 'validToken',
      }),
    ).not.toThrow();
  });

  it('should not recive a new refresh token with invalid refresh token', async () => {
    const inMemoryJwtService = new InMemoryJwtService();
    const userMemoryRepository = new InMemoryUserRepository();
    const refreshTokenRepository = new RefreshToken(
      userMemoryRepository,
      inMemoryJwtService,
    );

    expect(async () =>
      refreshTokenRepository.execute({
        refresh_token: 'invalidToken',
      }),
    ).rejects.toThrow();
  });

  it('should not recive a new refresh token if the email is not registered', async () => {
    const inMemoryJwtService = new InMemoryJwtService();
    const userMemoryRepository = new InMemoryUserRepository();
    const refreshTokenRepository = new RefreshToken(
      userMemoryRepository,
      inMemoryJwtService,
    );

    const user = makeUser({ email: new UserInfoEmail('email@gmail.com') });
    await userMemoryRepository.create(user);

    expect(async () =>
      refreshTokenRepository.execute({
        refresh_token: 'validToken',
      }),
    ).rejects.toThrow();
  });
});
