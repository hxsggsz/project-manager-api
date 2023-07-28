import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AddNewParticipant } from 'src/app/use-cases/participant/add-new-participant';
import {
  AddNewParticipantDTO,
  QueryNewParticipantDTO,
} from '../dtos/participant/add-new-participant.dto';
import { GetAllParticipants } from 'src/app/use-cases/participant/get-all-Participants';
import { RemoveParticipant } from 'src/app/use-cases/participant/remove-participant';
import { RemoveParticipantDTO } from '../dtos/participant/remove-participant-dto';

@Controller('participant')
export class ParticipantController {
  constructor(
    private addNewPart: AddNewParticipant,
    private getAllPart: GetAllParticipants,
    private removePart: RemoveParticipant,
  ) {}

  @Post()
  async AddNewParticipant(
    @Query() params: QueryNewParticipantDTO,
    @Body() body: AddNewParticipantDTO,
  ) {
    const { ownerId, projectId } = params;
    const { name, profilePhoto, username } = body;

    await this.addNewPart.execute({
      name,
      ownerId,
      profilePhoto,
      projectId,
      username,
    });
  }

  @Get('/:projectsId')
  async GetAllParticipants(@Param('projectsId') projectsId: string) {
    const { allParticipants } = await this.getAllPart.execute({ projectsId });

    return { allParticipants };
  }

  @Delete()
  async RemoveParticipant(@Query() params: RemoveParticipantDTO) {
    const { ownerId, participantId, projectId } = params;

    await this.removePart.execute({ ownerId, participantId, projectId });
  }
}
