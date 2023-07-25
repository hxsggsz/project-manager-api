import { Project } from './project';
import { ProjectName } from './project-name';

describe('projects entity', () => {
  it('should create a new entity correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const project = new Project({
      name: new ProjectName('testName'),
      ownerId: 'idTest',
      createdAt: date as unknown as Date,
    });

    expect(project).toBeTruthy();
    expect(project.name.value).toEqual('testName');
    expect(project.ownerId).toEqual('idTest');
    expect(project.createdAt).toEqual(date);
  });
});
