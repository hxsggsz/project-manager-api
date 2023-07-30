import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../entities/user/user';
import { JwtService } from '@nestjs/jwt';

interface LoginGithubRequest {
  code: string;
}

interface LoginGithubResponse {
  access_token: string;
  refresh_token: string;
}

interface GithubUserInfo {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

@Injectable()
export class LoginGithubUser {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(req: LoginGithubRequest): Promise<LoginGithubResponse> {
    const { code } = req;
    const accessTokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const { access_token } = accessTokenResponse.data;
    const userResponse = await axios.get<GithubUserInfo>(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userInfo = userResponse.data;
    const userExists = await this.userRepo.findUserByGithubId(
      userInfo.id.toString(),
    );

    const newUser = new User({
      name: userInfo.name,
      profilePhoto: userInfo.avatar_url,
      username: userInfo.login,
      githubId: userInfo.id.toString(),
    });
    if (!userExists) {
      await this.userRepo.create(newUser);
    }

    const token = {
      sub: newUser.id,
      name: newUser.name,
      username: newUser.username,
      profile_photo: newUser.profilePhoto,
    };

    return {
      access_token: await this.jwtService.signAsync(token),
      refresh_token: await this.jwtService.signAsync(token, {
        secret: process.env.SECRET_REFRESH,
      }),
    };
  }
}
