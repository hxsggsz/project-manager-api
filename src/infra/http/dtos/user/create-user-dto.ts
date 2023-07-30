import {
  IsNotEmpty,
  IsString,
  Max,
  Min,
  IsEmail,
  IsUrl,
  IsStrongPassword,
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

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsUrl()
  @IsString()
  @IsNotEmpty()
  profilePhoto: string;
}
