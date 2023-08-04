import { IsBoolean, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateAndUpdateProjectDTO {
  @Min(5)
  @Max(20)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
