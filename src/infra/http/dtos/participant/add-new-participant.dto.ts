import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class QueryNewParticipantDTO {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

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
}
