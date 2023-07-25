import {
  IsNotEmpty,
  IsString,
  Max,
  Min,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  @Max(15)
  name: string;

  @Min(3)
  @Max(15)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Min(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  profilePhoto: string;
}
