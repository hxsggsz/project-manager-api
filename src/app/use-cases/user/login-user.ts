import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository';
import { UserNotFound } from '../errors/user-not-found';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface LoginUserRequest {
  email: string;
  password: string;
}

interface LoginUserResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class LoginUser {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(req: LoginUserRequest): Promise<LoginUserResponse> {
    const { email, password } = req;

    const userToLogin = await this.userRepo.findUserByEmail(email);

    if (!userToLogin) throw new UserNotFound();

    const isSamePassword = await bcrypt.compare(password, userToLogin.password);

    if (!isSamePassword) throw new UserNotFound();

    const token = {
      sub: userToLogin.id,
      name: userToLogin.name,
      username: userToLogin.username,
      profile_photo: userToLogin.profilePhoto,
    };

    return {
      access_token: await this.jwtService.signAsync(token),
      refresh_token: await this.jwtService.signAsync(token, {
        secret: process.env.SECRET_REFRESH,
      }),
    };
  }
}
