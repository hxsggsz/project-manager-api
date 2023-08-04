import {
  Participant,
  RoleTypes,
} from 'src/app/entities/participant/participant';
import { participants as rawParticipants } from '@prisma/client';
export class PrismaParticipantMappers {
  static toDomain(raw: rawParticipants): Participant {
    return new Participant(
      {
        userId: raw.userId,
        projectId: raw.projectsId,
        role: raw.role as RoleTypes,
      },
      raw.id,
    );
  }
}
