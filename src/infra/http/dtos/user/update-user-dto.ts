import { IsString, Max, Min, IsUrl } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @Min(3)
  @Max(15)
  name: string;

  @Min(3)
  @Max(15)
  username: string;

  @IsString()
  @IsUrl()
  profilePhoto: string;
}
