import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/create-user';
import { CreateUserDto } from '../dtos/create-user-dto';

@Controller()
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post('signup')
  async SignUp(@Body() body: CreateUserDto) {
    const { email, name, password, profilePhoto, username } = body;

    await this.createUser.execute({
      email,
      name,
      password,
      profilePhoto,
      username,
    });
  }
}
