import { Project } from '../entities/project/project';
export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
}
