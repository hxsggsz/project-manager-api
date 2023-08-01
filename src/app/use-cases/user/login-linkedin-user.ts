import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../entities/user/user';
import { JwtService } from '@nestjs/jwt';

interface LoginLinkedinRequest {
  code: string;
}

interface LinkedinUserInfo {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

interface ResponseTokenType {
  access_token: string;
  expires_in: number;
}

@Injectable()
export class LoginLinkedinUser {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(req: LoginLinkedinRequest) {
    const { code } = req;

    const getAcessToken = await axios.post<ResponseTokenType>(
      'https://www.linkedin.com/oauth/v2/accessToken',
      null,
      {
        params: {
          code,
          grant_type: 'authorization_code',
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
          redirect_uri: `${process.env.AUTH_URL}/api/auth/linkedin`,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const { access_token } = getAcessToken.data;

    const userResponse = await axios.get<LinkedinUserInfo>(
      'https://api.linkedin.com/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userInfo = userResponse.data;

    let user = await this.userRepo.findUserByLinkedinId(userInfo.sub);

    const newUser = new User({
      linkedinId: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      profilePhoto: userInfo.picture,
      username: `Linkedin_${userInfo.sub}`,
    });

    if (!user) {
      user = await this.userRepo.create(newUser);
    }

    const token = {
      sub: user.id,
      name: user.name,
      username: user.username,
      profile_photo: user.profilePhoto,
    };

    return {
      access_token: await this.jwtService.signAsync(token),
      refresh_token: await this.jwtService.signAsync(token, {
        secret: process.env.SECRET_REFRESH,
      }),
    };
  }
}
