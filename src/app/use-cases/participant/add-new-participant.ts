import { Injectable } from '@nestjs/common';
import { Participant, RoleTypes } from '../../entities/participant/participant';
import { ParticipantRepository } from '../../repositories/participant-repository';
import { UserNotAuthorized } from '../errors/user-not-authorized';

interface AddNewParticipantRequest {
  projectId: string;
  userId: string;
  role: RoleTypes;
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
    const { projectId, userId, role } = req;

    const owner = await this.partRepo.getProjectOwner(projectId, userId);

    if (!owner || owner.role === 'user') throw new UserNotAuthorized();

    const newParticipant = new Participant({
      userId,
      projectId,
      role,
    });

    await this.partRepo.addParticipant(newParticipant);

    return { newParticipant };
  }
}
