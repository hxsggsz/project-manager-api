import { Controller, Post, Param, Body } from '@nestjs/common';
import { CreateProject } from '../../../app/use-cases/project/create-project';
import { CreateProjectDTO } from '../dtos/project/create-project-dto';

@Controller('project')
export class ProjectController {
  constructor(private createProject: CreateProject) {}

  @Post('/:ownerId')
  async createNewProject(
    @Param('ownerId') ownerId: string,
    @Body() body: CreateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.createProject.execute({ ownerId, name, isPublic });
  }
}
