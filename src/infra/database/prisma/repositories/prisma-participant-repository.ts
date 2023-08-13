import { Injectable } from '@nestjs/common';
import { Participant } from 'src/app/entities/participant/participant';
import { ParticipantRepository } from 'src/app/repositories/participant-repository';
import { PrismaService } from '../prisma.service';
import { PrismaParticipantMappers } from '../mappers/prisma-participants-mappers';
import { User } from 'src/app/entities/user/user';

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

  async addParticipant(participant: Participant): Promise<void> {
    console.log(participant);
    await this.prisma.participants.create({
      data: {
        userId: participant.userId,
        projects: { connect: { id: participant.projectId } },
      },
    });
  }

  async getAllParticipants(projectsId: string): Promise<User[]> {
    const participants = await this.prisma.participants.findMany({
      where: {
        projectsId,
      },
    });

    const participantsId = participants.map((part) => part.userId);

    const getparticipantsInfo = await this.prisma.user.findMany({
      where: {
        id: { in: participantsId },
      },
    });

    return getparticipantsInfo as User[];
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
      where: { projectsId, userId: ownerId },
    });

    if (!getTheOwner) return null;

    return PrismaParticipantMappers.toDomain(getTheOwner);
  }
}
