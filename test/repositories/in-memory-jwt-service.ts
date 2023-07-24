import { JwtService } from '@nestjs/jwt';

export class InMemoryJwtService extends JwtService {
  async signAsync(): Promise<string> {
    return 'logged';
  }
}
