import { JwtService } from '@nestjs/jwt';

export class InMemoryJwtService extends JwtService {
  async signAsync(): Promise<string> {
    return 'logged';
  }

  decode(token: string): string | { [key: string]: any } {
    if (token !== 'validToken') throw new Error('invalid token');
    return { email: 'test@gmail.com' };
  }
  async verifyAsync<T extends object = any>(token: string): Promise<T> {
    if (token !== 'validToken') throw new Error('invalid token');
    return {
      sub: '8f6df5e1-55c5-4ef3-8194-5f7b8c2ff258',
      name: 'nameUp',
      username: 'usernameUp1',
      profile_photo: 'https://image.com',
      iat: 1690300334,
      exp: 1692892334,
    } as T;
  }
}
