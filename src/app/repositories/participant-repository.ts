import { Participant } from '../entities/participant/participant';

export abstract class ParticipantRepository {
  abstract addParticipant(participant: Participant): Promise<void>;
  abstract getAllParticipant(projectsId: string): Promise<Participant[]>;
  abstract removeParticipant(participantId: string): Promise<void>;
}
