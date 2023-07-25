import { user as rawUser, projects as rawProjects } from '@prisma/client';
import { User } from '../../../../app/entities/user/user';
import { UserInfoName } from '../../../../app/entities/user/user-info-name';
import { UserInfoUsername } from '../../../../app/entities/user/user-info-username';
import { UserInfoEmail } from '../../../../app/entities/user/user-info-email';
import { UserInfoPassword } from '../../../../app/entities/user/user-info-password';
import { UserInfoProfilePhoto } from '../../../../app/entities/user/user-info-profile-photo';
import { Project } from 'src/app/entities/project/project';
import { ProjectName } from 'src/app/entities/project/project-name';

export class PrismaUserMappers {
  static toDomain(raw: rawUser): User {
    return new User(
      {
        name: new UserInfoName(raw.name),
        username: new UserInfoUsername(raw.username),
        email: new UserInfoEmail(raw.email),
        password: new UserInfoPassword(raw.password),
        profilePhoto: new UserInfoProfilePhoto(raw.profilePhoto),
        createdAt: raw.createdAt,
        githubId: raw.githubId,
        linkedinId: raw.linkedinId,
      },
      raw.id,
    );
  }

  static toDomainProject(raw: rawProjects): Project {
    return new Project(
      {
        name: new ProjectName(raw.name),
        isPublic: raw.isPublic,
        ownerId: raw.ownerId,
      },
      raw.id,
    );
  }

  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      username: user.username.value,
      email: user.email.value,
      password: user.password.value,
      profilePhoto: user.profilePhoto.value,
      createdAt: user.createdAt,
      githubId: user.githubId,
      linkedinId: user.linkedinId,
    };
  }
}
