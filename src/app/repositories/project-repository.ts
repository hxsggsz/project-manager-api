import { Participant } from '../entities/participant/participant';
import { Project } from '../entities/project/project';

export abstract class ProjectRepository {
  abstract createProjectWithParticipant(
    project: Project,
    participant: Participant,
  ): Promise<void>;
  abstract update(project: Project): Promise<void>;
  abstract findAll(userId: string): Promise<Project[]>;
  abstract findById(projectId: string): Promise<Project | null>;
  abstract deleteById(projectId: string): Promise<void>;
}
