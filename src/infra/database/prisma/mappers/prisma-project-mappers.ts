import { projects as rawProjects } from '@prisma/client';
import { Project } from 'src/app/entities/project/project';

export class PrismaProjectMappers {
  static toDomain(raw: rawProjects): Project {
    return new Project(
      {
        name: raw.name,
        isPublic: raw.isPublic,
        ownerId: raw.userId,
      },
      raw.id,
    );
  }
}
