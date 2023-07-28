import { makeParticipant } from '../../../../test/factories/participant-factory';
import { InMemoryParticipantRepository } from '../../../../test/repositories/in-memory-participant-repository';
import { GetAllParticipants } from './get-all-Participants';

describe('get all participants use case', () => {
  it('should get an array with one participant inside', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryGetAllPart = new GetAllParticipants(inMemoryPartRepo);

    const participant = makeParticipant();
    await inMemoryPartRepo.addParticipant(participant);

    const { allParticipants } = await inMemoryGetAllPart.execute({
      projectId: participant.projectId,
    });

    expect(allParticipants.length).toEqual(1);
    expect(allParticipants[0]).toEqual(participant);
  });

  it('should get an empty array if there is no participant inside', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryGetAllPart = new GetAllParticipants(inMemoryPartRepo);

    const { allParticipants } = await inMemoryGetAllPart.execute({
      projectId: 'project-123',
    });

    expect(allParticipants).toEqual([]);
    expect(allParticipants.length).toEqual(0);
  });
});
