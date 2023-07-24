import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserAlreadyRegistered } from './errors/user-already-registered';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user/user';
import { UserInfoName } from '../entities/user/user-info-name';
import { UserInfoProfilePhoto } from '../entities/user/user-info-profile-photo';
import { UserInfoUsername } from '../entities/user/user-info-username';
import { UserInfoEmail } from '../entities/user/user-info-email';
import { UserInfoPassword } from '../entities/user/user-info-password';

interface CreateUserRequest {
  name: string;
  profilePhoto: string;
  username: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.password, salt);

    const user = new User({
      name: new UserInfoName(req.name),
      profilePhoto: new UserInfoProfilePhoto(req.profilePhoto),
      email: new UserInfoEmail(req.email),
      password: new UserInfoPassword(hashPassword),
      username: new UserInfoUsername(req.username),
    });

    const checkUser = await this.userRepo.findUserByEmail(user.email.value);

    if (checkUser) throw new UserAlreadyRegistered();

    await this.userRepo.create(user);

    return { user };
  }
}
