import { makeProject } from '../../../../test/factories/project-factory';
import { makeParticipant } from '../../../../test/factories/participant-factory';
import { InMemoryParticipantRepository } from '../../../../test/repositories/in-memory-participant-repository';
import { RemoveParticipant } from './remove-participant';

describe('remove participant use case ', () => {
  it('should remove an existing participant correclty', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryRemovePart = new RemoveParticipant(inMemoryPartRepo);

    const participant = makeParticipant();
    const project = makeProject();
    await inMemoryPartRepo.addParticipant(participant);
    expect(inMemoryPartRepo.participant.length).toEqual(1);
    expect(inMemoryPartRepo.participant[0]).toEqual(participant);

    await inMemoryRemovePart.execute({
      participantId: participant.id,
      userId: project.userId,
      projectId: participant.projectId,
    });
    expect(inMemoryPartRepo.participant.length).toEqual(0);
    expect(inMemoryPartRepo.participant[0]).toBeUndefined();
  });

  it('should not remove an existing participant if the the user is not the owner', async () => {
    const inMemoryPartRepo = new InMemoryParticipantRepository();
    const inMemoryRemovePart = new RemoveParticipant(inMemoryPartRepo);

    const participant = makeParticipant();
    const project = makeProject();
    await inMemoryPartRepo.addParticipant(participant);
    expect(inMemoryPartRepo.participant.length).toEqual(1);
    expect(inMemoryPartRepo.participant[0]).toEqual(participant);

    expect(
      async () =>
        await inMemoryRemovePart.execute({
          participantId: participant.id,
          userId: 'wrongId',
          projectId: project.id,
        }),
    ).rejects.toThrow();
  });
});
