import { Project } from '../../src/app/entities/project/project';
import { ProjectRepository } from '../../src/app/repositories/project-repository';

export class InMemoryProjectRepository implements ProjectRepository {
  public project: Project[] = [];

  async create(project: Project): Promise<void> {
    this.project.push(project);
  }
  async update(project: Project): Promise<void> {
    const projectIndex = this.project.findIndex(
      (proj) => proj.id === project.id,
    );

    if (projectIndex >= 0) {
      this.project[projectIndex] = project;
    }
  }
  async findAll(ownerId: string): Promise<Project[]> {
    return this.project.filter((proj) => proj.ownerId === ownerId);
  }

  async findById(projectId: string): Promise<Project | null> {
    return this.project.find((proj) => proj.id === projectId);
  }
}
