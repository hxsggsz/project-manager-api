import { user as rawUser } from '@prisma/client';
import { User } from 'src/app/entities/user';

export class PrismaUserMappers {
  static toDomain(raw: rawUser): User {
    return new User(
      {
        name: raw.name,
        username: raw.username,
        email: raw.email,
        password: raw.password,
        profilePhoto: raw.password,
        createdAt: raw.createdAt,
        githubId: raw.githubId,
        linkedinId: raw.linkedinId,
      },
      raw.id,
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      profilePhoto: user.profilePhoto,
      createdAt: user.createdAt,
      githubId: user.githubId,
      linkedinId: user.linkedinId,
    };
  }
}
