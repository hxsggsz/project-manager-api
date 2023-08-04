import { InMemoryParticipantRepository } from '../../../../test/repositories/in-memory-participant-repository';
import { AddNewParticipant } from './add-new-participant';
import { makeParticipant } from '../../../../test/factories/participant-factory';
import { RoleTypes } from '../../entities/participant/participant';

describe('add new participant use case', () => {
  it('should add new participant correclty', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryAddParticipant = new AddNewParticipant(inMemoryPartRepo);

    const participant = makeParticipant();
    await inMemoryPartRepo.addParticipant(participant);

    const { newParticipant } = await inMemoryAddParticipant.execute({
      role: participant.role as RoleTypes,
      projectId: participant.projectId,
      userId: inMemoryPartRepo.project[0].userId,
    });

    expect(inMemoryPartRepo.participant.length).toEqual(2); // one user registered before
    expect(inMemoryPartRepo.participant[1]).toEqual(newParticipant);
  });
});
