import { makeProject } from '../../../../test/factories/project-factory';
import { InMemoryProjectRepository } from '../../../../test/repositories/in-memory-project-repository';
import { GetProjectById } from './get-project-by-id';

describe('get project by id use case', () => {
  it('should get one project correctly', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const getProjById = new GetProjectById(inMemoryProject);

    const proj = makeProject();
    await inMemoryProject.createProjectWithParticipant(proj);

    const { project } = await getProjById.execute({ projectId: proj.id });

    expect(proj).toEqual(project);
    expect(inMemoryProject.project.length).toEqual(1);
  });
});
