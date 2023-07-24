import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user/user';
import { UserInfoName } from '../entities/user/user-info-name';
import { UserInfoProfilePhoto } from '../entities/user/user-info-profile-photo';
import { UserInfoUsername } from '../entities/user/user-info-username';
import { JwtService } from '@nestjs/jwt';

interface LoginGithubRequest {
  code: string;
}

interface LoginGithubResponse {
  access_token: string;
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
      githubId: userInfo.id.toString(),
      name: new UserInfoName(userInfo.name),
      profilePhoto: new UserInfoProfilePhoto(userInfo.avatar_url),
      username: new UserInfoUsername(userInfo.login),
    });

    if (!userExists) await this.userRepo.create(newUser);

    const token = {
      sub: newUser.id,
      name: newUser.name.value,
      username: newUser.username.value,
      profile_photo: newUser.profilePhoto.value,
    };

    return {
      access_token: await this.jwtService.signAsync(token),
    };
  }
}
