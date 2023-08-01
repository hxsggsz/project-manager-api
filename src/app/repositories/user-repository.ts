import { User } from '../entities/user/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<void>;
  abstract findUserById(userId: string): Promise<User | null>;
  abstract findUserByGithubId(userId: string): Promise<User | null>;
  abstract findUserByLinkedinId(userId: string): Promise<User | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
}
