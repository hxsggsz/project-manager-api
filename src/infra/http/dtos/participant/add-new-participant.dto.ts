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
  role: RoleTypes;
}
