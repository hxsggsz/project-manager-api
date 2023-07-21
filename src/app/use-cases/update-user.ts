import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';

interface UpdateUserRequest {
  UserId: string;
  name: string;
  username: string;
  profilePhoto: string;
}

type UpdateUserResponse = void;

@Injectable()
export class UpdateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(req: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { UserId, name, username, profilePhoto } = req;
    const user = await this.userRepo.findUserById(UserId);

    if (!user) throw new UserNotFound();

    user.updateUser(username, name, profilePhoto);

    await this.userRepo.update(user);
  }
}
