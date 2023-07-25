import { InMemoryProjectRepository } from '../../../../test/repositories/in-memory-project-repository';
import { CreateProject } from './create-project';

describe('create project use case', () => {
  it('should create a new project correclty', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const createProject = new CreateProject(inMemoryProject);

    const { project } = await createProject.execute({
      name: 'testName',
      isPublic: true,
      ownerId: 'ownerId',
    });

    expect(inMemoryProject.project[0]).toEqual(project);
  });

  it('should create a new project correclty', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const createProject = new CreateProject(inMemoryProject);

    expect(
      async () =>
        await createProject.execute({
          name: 'test',
          isPublic: true,
          ownerId: 'ownerId',
        }),
    ).rejects.toThrow();
  });
});
