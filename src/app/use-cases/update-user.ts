import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/app/repositories/user-repository';
import { UserNotFound } from './errors/user-not-found';
import { UserInfoName } from '../entities/user/user-info-name';
import { UserInfoUsername } from '../entities/user/user-info-username';
import { UserInfoProfilePhoto } from '../entities/user/user-info-profile-photo';

interface UpdateUserRequest {
  UserId: string;
  name: UserInfoName;
  username: UserInfoUsername;
  profilePhoto: UserInfoProfilePhoto;
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
