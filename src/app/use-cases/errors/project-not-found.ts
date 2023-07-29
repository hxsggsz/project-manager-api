import { ServerError } from './server-error';

export class ProjectNotFound extends ServerError {
  constructor(statusCode = 404) {
    super('project not found', statusCode);
  }
}
