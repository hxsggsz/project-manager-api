import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateUser } from 'src/app/use-cases/create-user';
import { UpdateUser } from 'src/app/use-cases/update-user';
import { UserController } from './controllers/user.controller';
import { LoginUser } from 'src/app/use-cases/login-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, UpdateUser, LoginUser],
})
export class HttpModule {}
