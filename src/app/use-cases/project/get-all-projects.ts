import { Injectable } from '@nestjs/common';
import { Project } from '../../entities/project/project';
import { ProjectRepository } from '../../repositories/project-repository';

interface GetAllProjectsRequest {
  ownerId: string;
}

interface GetAllProjectsResponse {
  projects: Project[];
}

@Injectable()
export class GetAllProjects {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: GetAllProjectsRequest): Promise<GetAllProjectsResponse> {
    const { ownerId } = req;
    const projects = await this.projectRepo.findAll(ownerId);

    return { projects };
  }
}
