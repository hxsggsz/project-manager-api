import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/app/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { ProjectRepository } from '../../app/repositories/project-repository';
import { PrismaProjectRepository } from './prisma/repositories/prisma-project-repository';
import { ParticipantRepository } from 'src/app/repositories/participant-repository';
import { PrismaParticipantRepository } from './prisma/repositories/prisma-participant-repository';

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
    {
      provide: ParticipantRepository,
      useClass: PrismaParticipantRepository,
    },
  ],
  exports: [UserRepository, ProjectRepository, ParticipantRepository],
})
export class DatabaseModule {}
