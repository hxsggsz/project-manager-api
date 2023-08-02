import {
  Controller,
  Post,
  Param,
  Body,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateProject } from '../../../app/use-cases/project/create-project';
import { UpdateProject } from '../../../app/use-cases/project/update-project';
import { CreateAndUpdateProjectDTO } from '../dtos/project/create-and-update-project-dto';
import { GetAllProjects } from 'src/app/use-cases/project/get-all-projects';
import { GetProjectById } from 'src/app/use-cases/project/get-project-by-id';
import { DeleteProject } from 'src/app/use-cases/project/delete-project';

@Controller('project')
export class ProjectController {
  constructor(
    private getAllProjects: GetAllProjects,
    private getprojectById: GetProjectById,
    private createProject: CreateProject,
    private updateProject: UpdateProject,
    private deleteProject: DeleteProject,
  ) {}

  @Get('/:userId')
  async GetAllProjects(@Param('userId') userId: string) {
    const { projects } = await this.getAllProjects.execute({ userId });

    return { projects };
  }

  @Get('/one/:projectId')
  async GetProjectById(@Param('projectId') projectId: string) {
    const { project } = await this.getprojectById.execute({ projectId });

    return { project };
  }

  @Post('/:userId')
  async createNewProject(
    @Param('userId') userId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const {
      name,
      isPublic,
      participantName,
      participantPhoto,
      participantUsername,
    } = body;
    await this.createProject.execute({
      userId,
      name,
      isPublic,
      participantName,
      participantPhoto,
      participantUsername,
    });
  }

  @Put('/:projectId')
  async UpdateProject(
    @Param('projectId') projectId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.updateProject.execute({ projectId, name, isPublic });
  }

  @Delete('/:projectId')
  async DeleteProject(@Param('projectId') projectId: string) {
    await this.deleteProject.execute({ projectId });
  }
}
