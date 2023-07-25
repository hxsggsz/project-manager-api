import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from 'src/app/use-cases/user/create-user';
import { UpdateUser } from 'src/app/use-cases/user/update-user';
import { UserController } from './controllers/user.controller';
import { LoginUser } from 'src/app/use-cases/user/login-user';
import { LoginGithubUser } from 'src/app/use-cases/user/login-github-user';
import { RefreshToken } from 'src/app/use-cases/user/refresh-token-user';
import { LoginLinkedinUser } from 'src/app/use-cases/user/login-linkedin-user';

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
