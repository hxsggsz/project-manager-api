import { ServerError } from './server-error';

export class ParticipantNotFound extends ServerError {
  constructor(statusCode = 404) {
    super('participant not found', statusCode);
  }
}
