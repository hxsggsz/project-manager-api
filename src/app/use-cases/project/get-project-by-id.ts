import { Injectable } from '@nestjs/common';
import { Project } from '../../entities/project/project';
import { ProjectRepository } from '../../repositories/project-repository';
import { ProjectNotFound } from '../errors/project-not-found';

interface GetProjectByIdRequest {
  projectId: string;
}

interface GetProjectByIdResponse {
  project: Project;
}

@Injectable()
export class GetProjectById {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: GetProjectByIdRequest): Promise<GetProjectByIdResponse> {
    const { projectId } = req;
    const project = await this.projectRepo.findById(projectId);

    if (!project) throw new ProjectNotFound();

    return { project };
  }
}
