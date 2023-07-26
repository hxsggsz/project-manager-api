import { Injectable } from '@nestjs/common';
import { Project } from '../../../app/entities/project/project';
import { ProjectRepository } from '../../../app/repositories/project-repository';
import { ProjectNotFound } from '../errors/project-not-found';

interface UpdateUserRequest {
  projectId: string;
  name: string;
  isPublic: boolean;
}

interface UpdateUserResponse {
  project: Project;
}

@Injectable()
export class UpdateProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { projectId, name, isPublic } = req;

    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new ProjectNotFound();

    project.updateProject(name, isPublic);
    await this.projectRepo.update(project);

    return { project };
  }
}
