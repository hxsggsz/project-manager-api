import { Injectable } from '@nestjs/common';
import { ProjectName } from '../../../app/entities/project/project-name';
import { Project } from '../../../app/entities/project/project';
import { ProjectRepository } from '../../../app/repositories/project-repository';

interface CreateProjectRequest {
  name: string;
  isPublic: boolean;
  ownerId: string;
}

interface CreateProjectResponse {
  project: Project;
}

@Injectable()
export class CreateProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: CreateProjectRequest): Promise<CreateProjectResponse> {
    const { name, isPublic, ownerId } = req;

    const project = new Project({
      name: new ProjectName(name),
      isPublic,
      ownerId,
    });

    await this.projectRepo.create(project);

    return { project };
  }
}
