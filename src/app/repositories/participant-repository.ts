import { Participant } from '../entities/participant/participant';

export abstract class ParticipantRepository {
  abstract findParticipantById(
    participantId: string,
  ): Promise<Participant | null>;
  abstract addParticipant(participant: Participant): Promise<void>;
  abstract getAllParticipants(projectsId: string): Promise<Participant[]>;
  abstract removeParticipant(participantId: string): Promise<void>;
  abstract getProjectOwner(
    projectsId: string,
    ownerId: string,
  ): Promise<Participant | null>;
}
