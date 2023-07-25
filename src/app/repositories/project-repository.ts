import { Project } from '../entities/project/project';

export abstract class ProjectRepository {
  abstract create(project: Project): Promise<void>;
  abstract update(project: Project): Promise<void>;
  abstract findAll(ownerId: string): Promise<Project[] | null>;
  abstract findById(projectId: string): Promise<Project | void>;
}
