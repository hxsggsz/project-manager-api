import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository';
import { JwtService } from '@nestjs/jwt';
import { UserNotFound } from '../errors/user-not-found';

interface RefreshTokenRequest {
  refresh_token: string;
}

interface RefreshTokenResponse {
  refreshToken: string;
}

@Injectable()
export class RefreshToken {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(req: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const payload = await this.verifyRefreshToken(req.refresh_token);

    const token = {
      sub: payload.id,
      name: payload.name.value,
      username: payload.username.value,
      profilePhoto: payload.profilePhoto.value,
    };
    return {
      refreshToken: await this.jwtService.signAsync(token),
    };
  }

  private async verifyRefreshToken(refresh_token: string) {
    const email = this.jwtService.decode(refresh_token)['email'];
    const getUser = await this.userRepo.findUserByEmail(email);

    if (!getUser) throw new UserNotFound();
    try {
      await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.SECRET_REFRESH,
      });
      return getUser;
    } catch (error) {
      console.log(error);
    }
  }
}
