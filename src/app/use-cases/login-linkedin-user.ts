import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user/user';
import { UserInfoName } from '../entities/user/user-info-name';
import { UserInfoProfilePhoto } from '../entities/user/user-info-profile-photo';
import { UserInfoUsername } from '../entities/user/user-info-username';
import { JwtService } from '@nestjs/jwt';
import { UserInfoEmail } from '../entities/user/user-info-email';

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

    const userExists = await this.userRepo.findUserByLinkedinId(userInfo.sub);

    const newUser = new User({
      linkedinId: userInfo.sub,
      name: new UserInfoName(userInfo.name),
      email: new UserInfoEmail(userInfo.email),
      profilePhoto: new UserInfoProfilePhoto(userInfo.picture),
      username: new UserInfoUsername(`Linkedin_${userInfo.sub}`),
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
