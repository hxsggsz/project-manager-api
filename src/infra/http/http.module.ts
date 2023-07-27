import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { UpdateUser } from 'src/app/use-cases/user/update-user';
import { UserController } from './controllers/user.controller';
import { LoginUser } from 'src/app/use-cases/user/login-user';
import { LoginGithubUser } from 'src/app/use-cases/user/login-github-user';
import { RefreshToken } from 'src/app/use-cases/user/refresh-token-user';
import { LoginLinkedinUser } from 'src/app/use-cases/user/login-linkedin-user';
import { ProjectController } from './controllers/project.controller';
import { CreateProject } from 'src/app/use-cases/project/create-project';
import { UpdateProject } from 'src/app/use-cases/project/update-project';
import { GetAllProjects } from 'src/app/use-cases/project/get-all-projects';
import { GetProjectById } from 'src/app/use-cases/project/get-project-by-id';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, ProjectController],
  providers: [
    CreateUser,
    UpdateUser,
    LoginUser,
    LoginGithubUser,
    LoginLinkedinUser,
    RefreshToken,
    GetAllProjects,
    GetProjectById,
    CreateProject,
    UpdateProject,
  ],
})
export class HttpModule {}
