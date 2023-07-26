export class ProjectNotFound extends Error {
  constructor() {
    super('project not found');
  }
}
