import { IsString, IsUUID } from 'class-validator';

export class RemoveParticipantDTO {
  @IsString()
  @IsUUID()
  participantId: string;
  @IsString()
  @IsUUID()
  projectId: string;
  @IsString()
  @IsUUID()
  ownerId: string;
}
