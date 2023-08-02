import { ServerError } from './server-error';

export class UserNotAuthorized extends ServerError {
  constructor(statusCode = 401) {
    super('User not authorized', statusCode);
  }
}
