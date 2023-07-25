import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from 'src/app/use-cases/create-user';
import { UpdateUser } from 'src/app/use-cases/update-user';
import { UserController } from './controllers/user.controller';
import { LoginUser } from 'src/app/use-cases/login-user';
import { LoginGithubUser } from 'src/app/use-cases/login-github-user';
import { RefreshToken } from 'src/app/use-cases/refresh-token-user';
import { LoginLinkedinUser } from 'src/app/use-cases/login-linkedin-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUser,
    UpdateUser,
    LoginUser,
    LoginGithubUser,
    LoginLinkedinUser,
    RefreshToken,
  ],
})
export class HttpModule {}
