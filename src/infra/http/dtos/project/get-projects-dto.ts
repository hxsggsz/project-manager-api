import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllProjectsDTO {
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

export class GetOneProjectDTO {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
