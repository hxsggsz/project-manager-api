import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository';
import { UserNotFound } from '../errors/user-not-found';
import {} from '../../entities/user/user-info-name';
import {} from '../../entities/user/user-info-username';
import {} from '../../entities/user/user-info-profile-photo';

interface UpdateUserRequest {
  id: string;
  name: string;
  username: string;
  profilePhoto: string;
}

@Injectable()
export class UpdateUser {
  constructor(private userRepo: UserRepository) {}

  async execute(req: UpdateUserRequest): Promise<void> {
    const { id, name, username, profilePhoto } = req;
    const user = await this.userRepo.findUserById(id);

    if (!user) throw new UserNotFound();

    user.updateUser(username, name, profilePhoto);

    await this.userRepo.update(user);
  }
}
