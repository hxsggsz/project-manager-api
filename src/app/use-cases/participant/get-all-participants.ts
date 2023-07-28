import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from '../../repositories/participant-repository';
import { Participant } from 'src/app/entities/participant/participant';

interface GetAllParticipantsRequest {
  projectsId: string;
}

interface GetAllParticipantsResponse {
  allParticipants: Participant[];
}

@Injectable()
export class GetAllParticipants {
  constructor(private partRepo: ParticipantRepository) {}

  async execute(
    req: GetAllParticipantsRequest,
  ): Promise<GetAllParticipantsResponse> {
    const { projectsId } = req;
    console.log(projectsId);
    const allParticipants = await this.partRepo.getAllParticipants(projectsId);

    return { allParticipants };
  }
}
