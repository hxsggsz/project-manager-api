import { IsString } from 'class-validator';

export class ThirdPartyLoginDTO {
  @IsString()
  code: string;
}
