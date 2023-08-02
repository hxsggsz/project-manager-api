import { makeProject } from '../../../../test/factories/project-factory';
import { InMemoryProjectRepository } from '../../../../test/repositories/in-memory-project-repository';
import { DeleteProject } from './delete-project';

describe('delete project use case', () => {
  it('should delete project succesfully', async () => {
    const inMemoryProjRepo = new InMemoryProjectRepository();
    const inMemoryDeleteProj = new DeleteProject(inMemoryProjRepo);

    const proj = makeProject();
    await inMemoryProjRepo.createProjectWithParticipant(proj);

    expect(inMemoryProjRepo.project.length).toEqual(1);

    await inMemoryDeleteProj.execute({ projectId: proj.id });

    expect(inMemoryProjRepo.project).toEqual([]);
    expect(inMemoryProjRepo.project.length).toEqual(0);
  });

  it('should not delete the project with wrong or not existing id', async () => {
    const inMemoryProjRepo = new InMemoryProjectRepository();
    const inMemoryDeleteProj = new DeleteProject(inMemoryProjRepo);

    expect(
      async () => await inMemoryDeleteProj.execute({ projectId: 'wrong-id' }),
    ).rejects.toThrow('project not found');
  });
});
