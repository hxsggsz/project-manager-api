import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUser } from '../../../app/use-cases/user/create-user';
import { CreateUserDTO } from '../dtos/user/create-user-dto';
import { UpdateUserDTO } from '../dtos/user/update-user-dto';
import { UpdateUser } from '../../../app/use-cases/user/update-user';
import { LoginUser } from 'src/app/use-cases/user/login-user';
import { LoginUserDTO } from '../dtos/user/login-user-dto';
import { ThirdPartyLoginDTO } from '../dtos/user/third-party-login-dto';
import { LoginGithubUser } from '../../../app/use-cases/user/login-github-user';
import { LoginLinkedinUser } from 'src/app/use-cases/user/login-linkedin-user';
import { RefreshToken } from 'src/app/use-cases/user/refresh-token-user';
import { RefreshTokenDTO } from '../dtos/user/refresh-token-dto';
import { SkipAuth } from 'src/helpers/skip-auth';

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

  @SkipAuth()
  @Post('signUp')
  async SignUp(@Body() body: CreateUserDTO) {
    await this.createUser.execute(body);
  }

  @SkipAuth()
  @Put('updateUser/:id')
  async UpdateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const { name, profilePhoto, username } = body;

    await this.updateUser.execute({ id, name, username, profilePhoto });
  }

  @SkipAuth()
  @Post('login')
  async LoginUser(@Body() body: LoginUserDTO) {
    const { access_token, refresh_token } = await this.loginUser.execute(body);

    return { access_token, refresh_token };
  }

  @SkipAuth()
  @Post('github')
  async LoginGithub(@Body() body: ThirdPartyLoginDTO) {
    const { access_token } = await this.loginGithub.execute(body);

    return { access_token };
  }

  @SkipAuth()
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
