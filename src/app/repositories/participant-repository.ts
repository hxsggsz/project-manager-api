import { Participant } from '../entities/participant/participant';
import { User } from '../entities/user/user';

export abstract class ParticipantRepository {
  abstract findParticipantById(
    participantId: string,
  ): Promise<Participant | null>;
  abstract addParticipant(participant: Participant): Promise<void>;
  abstract getAllParticipants(projectsId: string): Promise<User[]>;
  abstract removeParticipant(participantId: string): Promise<void>;
  abstract getProjectOwner(
    projectsId: string,
    ownerId: string,
  ): Promise<Participant | null>;
}
