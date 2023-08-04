import { Injectable } from '@nestjs/common';
import { Participant } from 'src/app/entities/participant/participant';
import { ParticipantRepository } from 'src/app/repositories/participant-repository';
import { PrismaService } from '../prisma.service';
import { PrismaParticipantMappers } from '../mappers/prisma-participants-mappers';

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
      where: { projectsId },
    });

    return allParticipants.map(PrismaParticipantMappers.toDomain);
  }

  async addParticipant(participant: Participant): Promise<void> {
    console.log(participant);
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

  async getProjectOwner(
    projectsId: string,
    ownerId: string,
  ): Promise<Participant | null> {
    const getTheOwner = await this.prisma.participants.findFirst({
      where: { projectsId, projects: { userId: ownerId } },
    });

    if (!getTheOwner) return null;

    return PrismaParticipantMappers.toDomain(getTheOwner);
  }
}
