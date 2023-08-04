import { Injectable } from '@nestjs/common';
import { Project } from '../../../app/entities/project/project';
import { ProjectRepository } from '../../../app/repositories/project-repository';
import { Participant } from '../../../app/entities/participant/participant';

interface CreateProjectRequest {
  name: string;
  isPublic: boolean;
  userId: string;
}

interface CreateProjectResponse {
  project: Project;
}

@Injectable()
export class CreateProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(req: CreateProjectRequest): Promise<CreateProjectResponse> {
    const project = new Project({
      name: req.name,
      isPublic: req.isPublic,
      userId: req.userId,
    });

    const newParticipant = new Participant({
      userId: req.userId,
      projectId: project.id,
      role: 'owner',
    });

    await this.projectRepo.createProjectWithParticipant(
      project,
      newParticipant,
    );

    return { project };
  }
}
