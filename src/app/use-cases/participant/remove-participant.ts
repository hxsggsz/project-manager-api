import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from '../../repositories/participant-repository';
import { ParticipantNotFound } from '../errors/participant-not-found';
import { UserNotAuthorized } from '../errors/user-not-authorized';

interface RemoveParticipantRequest {
  participantId: string;
  projectId: string;
  ownerId: string;
}

@Injectable()
export class RemoveParticipant {
  constructor(private partRepo: ParticipantRepository) {}

  async execute(req: RemoveParticipantRequest): Promise<void> {
    const { participantId, projectId, ownerId } = req;

    const isTheOwner = await this.partRepo.getProjectOwner(projectId);

    if (isTheOwner.ownerId !== ownerId) throw new UserNotAuthorized();

    const participantExists = await this.partRepo.findParticipantById(
      participantId,
    );

    if (!participantExists) throw new ParticipantNotFound();

    await this.partRepo.removeParticipant(participantId);
  }
}
