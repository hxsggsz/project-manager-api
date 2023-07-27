import { Controller, Post, Param, Body, Put, Get } from '@nestjs/common';
import { CreateProject } from '../../../app/use-cases/project/create-project';
import { UpdateProject } from '../../../app/use-cases/project/update-project';
import { CreateAndUpdateProjectDTO } from '../dtos/project/create-and-update-project-dto';
import { GetAllProjects } from 'src/app/use-cases/project/get-all-projects';

@Controller('project')
export class ProjectController {
  constructor(
    private getAllProjects: GetAllProjects,
    private createProject: CreateProject,
    private updateProject: UpdateProject,
  ) {}

  @Get('/:ownerId')
  async GetAllProjects(@Param('ownerId') ownerId: string) {
    const { projects } = await this.getAllProjects.execute({ ownerId });

    return { projects };
  }

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
