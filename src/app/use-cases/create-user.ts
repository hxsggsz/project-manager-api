import { Injectable } from '@nestjs/common';
import { User } from 'src/app/entities/user';
import { UserRepository } from '../repositories/user-repository';
import { UserAlreadyRegistered } from './errors/user-already-registered';

interface CreateUserRequest {
  name: string;
  profilePhoto: string;
  username: string;
  email: string;
  password: string;
  githubId?: string | null;
  linkedinId?: string | null;
}

type CreateUserResponse = void;

@Injectable()
export class CreateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(req: CreateUserRequest): Promise<CreateUserResponse> {
    const user = new User({
      name: req.name,
      profilePhoto: req.profilePhoto,
      email: req.email,
      password: req.password,
      username: req.username,
      githubId: req.githubId ?? null,
      linkedinId: req.linkedinId ?? null,
    });

    const checkUser = await this.userRepo.findUserByEmail(user.email);

    if (checkUser) throw new UserAlreadyRegistered();

    await this.userRepo.create(user);
  }
}
