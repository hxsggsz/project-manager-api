export class ParticipantNotFound extends Error {
  constructor() {
    super('participant not found');
  }
}
