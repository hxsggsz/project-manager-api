import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/create-user';
import { CreateUserDTO } from '../dtos/create-user-dto';
import { UpdateUserDTO } from '../dtos/update-user-dto';
import { UpdateUser } from '../../../app/use-cases/update-user';
import { LoginUser } from 'src/app/use-cases/login-user';
import { LoginUserDTO } from '../dtos/login-user-dto';
import { ThirdPartyLoginDTO } from '../dtos/third-party-login-dto';
import { LoginGithubUser } from '../../../app/use-cases/login-github-user';
import { LoginLinkedinUser } from 'src/app/use-cases/login-linkedin-user';
import { RefreshToken } from 'src/app/use-cases/refresh-token-user';
import { RefreshTokenDTO } from '../dtos/refresh-token-dto';

@Controller()
export class UserController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    private loginUser: LoginUser,
    private loginGithub: LoginGithubUser,
    private loginLinkedin: LoginLinkedinUser,
    private refreshToken: RefreshToken,
  ) {}

  @Post('signUp')
  async SignUp(@Body() body: CreateUserDTO) {
    await this.createUser.execute(body);
  }

  @Put('updateUser/:id')
  async UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const { name, profilePhoto, username } = body;

    await this.updateUser.execute({ id, name, username, profilePhoto });
  }

  @Post('login')
  async LoginUser(@Body() body: LoginUserDTO) {
    const { access_token, refresh_token } = await this.loginUser.execute(body);

    return { access_token, refresh_token };
  }

  @Post('github')
  async LoginGithub(@Body() body: ThirdPartyLoginDTO) {
    const { access_token } = await this.loginGithub.execute(body);

    return { access_token };
  }

  @Post('linkedin')
  async LoginLinkedin(@Body() body: ThirdPartyLoginDTO) {
    const { access_token } = await this.loginLinkedin.execute(body);

    return { access_token };
  }

  @Post('refreshToken')
  async RefreshToken(@Body() body: RefreshTokenDTO) {
    const { refreshToken } = await this.refreshToken.execute(body);

    return { refreshToken };
  }
}
