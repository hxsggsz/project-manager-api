import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/create-user';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { UpdateUser } from '../../../app/use-cases/update-user';
import { LoginUser } from 'src/app/use-cases/login-user';
import { LoginUserDTO } from '../dtos/login-user-dto';

@Controller()
export class UserController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    private loginUser: LoginUser,
  ) {}

  @Post('signUp')
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

  @Post('login')
  async LoginUser(@Body() body: LoginUserDTO) {
    const { email, password } = body;

    const { access_token } = await this.loginUser.execute({ email, password });

    return { access_token };
  }
}
