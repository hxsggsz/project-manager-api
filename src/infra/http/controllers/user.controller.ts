import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/create-user';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { UpdateUser } from '../../../app/use-cases/update-user';

@Controller()
export class UserController {
  constructor(private createUser: CreateUser, private updateUser: UpdateUser) {}

  @Post('signup')
  async SignUp(@Body() body: CreateUserDTO) {
    const { email, name, password, profilePhoto, username } = body;

    await this.createUser.execute({
      email,
      name,
      password,
      profilePhoto,
      username,
    });
  }

  @Put('updateUser/:id')
  async UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const { name, profilePhoto, username } = body;

    await this.updateUser.execute({ id, name, username, profilePhoto });
  }
}
