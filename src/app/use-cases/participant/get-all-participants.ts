import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from '../../repositories/participant-repository';
import { User } from 'src/app/entities/user/user';

interface GetAllParticipantsRequest {
  projectsId: string;
}

interface GetAllParticipantsResponse {
  allParticipants: User[];
}

@Injectable()
export class GetAllParticipants {
  constructor(private partRepo: ParticipantRepository) {}

  async execute(
    req: GetAllParticipantsRequest,
  ): Promise<GetAllParticipantsResponse> {
    const { projectsId } = req;
    const allParticipants = await this.partRepo.getAllParticipants(projectsId);

    return { allParticipants };
  }
}
