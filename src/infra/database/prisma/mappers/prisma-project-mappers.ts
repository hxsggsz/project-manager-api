import { projects as rawProjects } from '@prisma/client';
import { Project } from 'src/app/entities/project/project';
import { ProjectName } from 'src/app/entities/project/project-name';

export class PrismaProjectMappers {
  static toDomain(raw: rawProjects): Project {
    return new Project(
      {
        name: new ProjectName(raw.name),
        isPublic: raw.isPublic,
        ownerId: raw.ownerId,
      },
      raw.id,
    );
  }
}
