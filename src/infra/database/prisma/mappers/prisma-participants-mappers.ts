import { Participant } from 'src/app/entities/participant/participant';
import { participants as rawParticipants } from '@prisma/client';
export class PrismaParticipantMappers {
  static toDomain(raw: rawParticipants): Participant {
    return new Participant(
      {
        name: raw.name,
        profilePhoto: raw.profilePhoto,
        username: raw.username,
        projectId: raw.projectsId,
      },
      raw.id,
    );
  }
}
