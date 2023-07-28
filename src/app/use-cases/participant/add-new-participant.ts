import { Injectable } from '@nestjs/common';
import { Participant } from '../../entities/participant/participant';
import { ParticipantRepository } from '../../repositories/participant-repository';
import { UserNotAuthorized } from '../errors/user-not-authorized';

interface AddNewParticipantRequest {
  name: string;
  username: string;
  profilePhoto: string;
  projectId: string;
  ownerId: string;
}

interface AddNewParticipantResponse {
  newParticipant: Participant;
}

@Injectable()
export class AddNewParticipant {
  constructor(private partRepo: ParticipantRepository) {}

  async execute(
    req: AddNewParticipantRequest,
  ): Promise<AddNewParticipantResponse> {
    const { name, profilePhoto, projectId, username, ownerId } = req;

    const isOwner = await this.partRepo.getProjectOwner(projectId);
    if (isOwner.ownerId !== ownerId) throw new UserNotAuthorized();

    const newParticipant = new Participant({
      name,
      username,
      profilePhoto,
      projectId,
    });

    await this.partRepo.addParticipant(newParticipant);

    return { newParticipant };
  }
}
