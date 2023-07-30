import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository';
import { UserAlreadyRegistered } from '../errors/user-already-registered';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user/user';

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
      name: req.name,
      profilePhoto: req.profilePhoto,
      email: req.email,
      password: hashPassword,
      username: req.username,
    });

    const checkUser = await this.userRepo.findUserByEmail(user.email);

    if (checkUser) throw new UserAlreadyRegistered();

    await this.userRepo.create(user);

    return { user };
  }
}
