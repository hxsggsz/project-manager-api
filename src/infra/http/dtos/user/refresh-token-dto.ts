import { IsJWT, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @IsString()
  @IsJWT()
  refresh_token: string;
}
