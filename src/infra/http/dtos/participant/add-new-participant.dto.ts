import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { RoleTypes } from 'src/app/entities/participant/participant';

export class QueryNewParticipantDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}

export class AddNewParticipantDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  profilePhoto: string;

  @IsString()
  @IsNotEmpty()
  role: RoleTypes;
}
