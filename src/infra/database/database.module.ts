import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { ProjectRepository } from '../../app/repositories/project-repository';
import { PrismaProjectRepository } from './prisma/repositories/prisma-project-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ProjectRepository,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [UserRepository, ProjectRepository],
})
export class DatabaseModule {}
