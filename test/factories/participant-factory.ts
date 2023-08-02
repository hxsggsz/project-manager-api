import {
  Participant,
  ParticipantProps,
} from '../../src/app/entities/participant/participant';
import { Override } from '../../src/helpers/override';

export function makeParticipant(
  override: Override<ParticipantProps> = {},
): Participant {
  return new Participant({
    name: 'name test',
    username: 'username test',
    profilePhoto: 'https://profile.com',
    role: 'admin',
    projectId: 'project123',
    ...override,
  });
}
