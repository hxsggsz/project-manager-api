import { ServerError } from './server-error';

export class UserAlreadyRegistered extends ServerError {
  constructor(statusError = 400) {
    super('this user is already register', statusError);
  }
}
