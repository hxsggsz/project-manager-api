import { InMemoryParticipantRepository } from '../../../../test/repositories/in-memory-participant-repository';
import { AddNewParticipant } from './add-new-participant';
import { makeParticipant } from '../../../../test/factories/participant-factory';

describe('add new participant use case', () => {
  it('should add new participant correclty', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryAddParticipant = new AddNewParticipant(inMemoryPartRepo);

    const participant = makeParticipant();
    const { newParticipant } = await inMemoryAddParticipant.execute({
      name: participant.name,
      username: participant.username,
      profilePhoto: participant.profilePhoto,
      ownerId: inMemoryPartRepo.project[0].ownerId,
      projectId: inMemoryPartRepo.project[0].id,
    });

    expect(inMemoryPartRepo.participant.length).toEqual(1);
    expect(inMemoryPartRepo.participant[0]).toEqual(newParticipant);
  });
});
