import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../repositories/project-repository';
import { ProjectNotFound } from '../errors/project-not-found';

interface DeleteProjectRequest {
  projectId: string;
}

@Injectable()
export class DeleteProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: DeleteProjectRequest): Promise<void> {
    const { projectId } = req;
    const getProjectToDelete = await this.projectRepo.findById(projectId);

    if (!getProjectToDelete) throw new ProjectNotFound();

    await this.projectRepo.deleteById(projectId);
  }
}
