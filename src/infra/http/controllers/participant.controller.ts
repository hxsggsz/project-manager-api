import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  AddNewParticipantDTO,
  QueryNewParticipantDTO,
} from '../dtos/participant/add-new-participant.dto';
import { AddNewParticipant } from 'src/app/use-cases/participant/add-new-participant';
import { GetAllParticipants } from '../../../app/use-cases/participant/get-all-participants';
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
    const { userId, projectId } = params;
    const { name, profilePhoto, username, role } = body;

    await this.addNewPart.execute({
      name,
      userId,
      profilePhoto,
      projectId,
      username,
      role,
    });
  }

  @Get('/:projectsId')
  async GetAllParticipants(@Param('projectsId') projectsId: string) {
    const { allParticipants } = await this.getAllPart.execute({ projectsId });

    return { allParticipants };
  }

  @Delete()
  async RemoveParticipant(@Query() params: RemoveParticipantDTO) {
    const { userId, participantId, projectId } = params;

    await this.removePart.execute({ userId, participantId, projectId });
  }
}
