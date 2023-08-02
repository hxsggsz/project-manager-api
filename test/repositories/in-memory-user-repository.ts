import { User } from '../../src/app/entities/user/user';
import { UserRepository } from '../../src/app/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  public userMemory: User[] = [];

  async create(user: User): Promise<User> {
    this.userMemory.push(user);
    return this.userMemory[0];
  }

  async update(user: User): Promise<void> {
    const userIndex = this.userMemory.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.userMemory[userIndex] = user;
    }
  }

  async findUserById(userId: string): Promise<User> {
    return this.userMemory.find((item) => item.id === userId);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userMemory.find((item) => item.email === email);
  }

  async findUserByGithubId(githubId: string): Promise<User> {
    return this.userMemory.find((item) => item.githubId === githubId);
  }

  async findUserByLinkedinId(linkedinId: string): Promise<User> {
    return this.userMemory.find((item) => item.linkedinId === linkedinId);
  }
}
