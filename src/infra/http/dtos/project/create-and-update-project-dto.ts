import { IsBoolean, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateAndUpdateProjectDTO {
  @Min(5)
  @Max(20)
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @IsString()
  @IsNotEmpty()
  participantName: string;

  @IsString()
  @IsNotEmpty()
  participantUsername: string;

  @IsString()
  @IsNotEmpty()
  participantPhoto: string;
}
