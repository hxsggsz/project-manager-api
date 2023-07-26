import { Controller, Post, Param, Body, Put } from '@nestjs/common';
import { CreateProject } from '../../../app/use-cases/project/create-project';
import { UpdateProject } from '../../../app/use-cases/project/update-project';
import { CreateAndUpdateProjectDTO } from '../dtos/project/create-and-update-project-dto';

@Controller('project')
export class ProjectController {
  constructor(
    private createProject: CreateProject,
    private updateProject: UpdateProject,
  ) {}

  @Post('/:ownerId')
  async createNewProject(
    @Param('ownerId') ownerId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.createProject.execute({ ownerId, name, isPublic });
  }

  @Put('/:projectId')
  async UpdateProject(
    @Param('projectId') projectId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.updateProject.execute({ projectId, name, isPublic });
  }
}
