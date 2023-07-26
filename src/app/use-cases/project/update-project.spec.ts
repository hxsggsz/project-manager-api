import { makeProject } from '../../../../test/factories/project-factory';
import { InMemoryProjectRepository } from '../../../../test/repositories/in-memory-project-repository';
import { UpdateProject } from './update-project';

describe('update project use case', () => {
  it('should update an existing project correctly', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const updateProject = new UpdateProject(inMemoryProject);

    const projToUpdate = makeProject();
    await inMemoryProject.create(projToUpdate);

    expect(inMemoryProject.project[0]).toEqual(projToUpdate);

    const { project } = await updateProject.execute({
      projectId: projToUpdate.id,
      name: 'new name updated',
      isPublic: false,
    });

    expect(inMemoryProject.project[0]).toEqual(project);
  });

  it('should not update an user that not exists', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const updateProject = new UpdateProject(inMemoryProject);

    expect(
      async () =>
        await updateProject.execute({
          projectId: 'inexistent-id',
          name: 'new name updated',
          isPublic: false,
        }),
    ).rejects.toThrow();
  });

  it('should not update an user with an invalid id', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const updateProject = new UpdateProject(inMemoryProject);

    const projToUpdate = makeProject();
    await inMemoryProject.create(projToUpdate);

    expect(inMemoryProject.project[0]).toEqual(projToUpdate);

    expect(
      async () =>
        await updateProject.execute({
          projectId: 'wrong-id',
          name: 'new name updated',
          isPublic: false,
        }),
    ).rejects.toThrow();
  });
});
