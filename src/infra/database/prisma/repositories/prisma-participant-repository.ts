import { Injectable } from '@nestjs/common';
import { Participant } from 'src/app/entities/participant/participant';
import { ParticipantRepository } from 'src/app/repositories/participant-repository';
import { PrismaService } from '../prisma.service';
import { PrismaParticipantMappers } from '../mappers/prisma-participants-mappers';
import { Project } from 'src/app/entities/project/project';
import { PrismaProjectMappers } from '../mappers/prisma-project-mappers';

@Injectable()
export class PrismaParticipantRepository implements ParticipantRepository {
  constructor(private prisma: PrismaService) {}

  async findParticipantById(
    participantId: string,
  ): Promise<Participant | null> {
    const participant = await this.prisma.participants.findUnique({
      where: { id: participantId },
    });

    if (!participant) null;

    return PrismaParticipantMappers.toDomain(participant);
  }

  async getAllParticipants(projectsId: string): Promise<Participant[]> {
    const allParticipants = await this.prisma.participants.findMany({
      where: { projectsId: projectsId },
    });

    return allParticipants.map(PrismaParticipantMappers.toDomain);
  }

  async addParticipant(participant: Participant): Promise<void> {
    await this.prisma.participants.create({
      data: {
        name: participant.name,
        username: participant.username,
        profilePhoto: participant.profilePhoto,
        projects: { connect: { id: participant.projectId } },
      },
    });
  }

  async getAllParticipant(projectsId: string): Promise<Participant[]> {
    const participants = await this.prisma.participants.findMany({
      where: {
        projectsId,
      },
    });

    return participants.map(PrismaParticipantMappers.toDomain);
  }

  async removeParticipant(participantId: string): Promise<void> {
    await this.prisma.participants.delete({
      where: { id: participantId },
    });
  }

  async getProjectOwner(projectsId: string): Promise<Project | null> {
    const getTheProject = await this.prisma.projects.findUnique({
      where: { id: projectsId },
    });

    if (!getTheProject) null;

    return PrismaProjectMappers.toDomain(getTheProject);
  }
}
