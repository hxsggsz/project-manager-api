import { User } from '../entities/user/user';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract update(user: User): Promise<void>;
  abstract findUserById(userId: string): Promise<User | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
}
