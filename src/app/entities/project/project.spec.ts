import { Project } from './project';
import { ProjectName } from './project-name';

describe('projects entity', () => {
  it('should create a new entity correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const project = new Project({
      name: new ProjectName('testName'),
      isPublic: true,
      ownerId: 'idTest',
      createdAt: date as unknown as Date,
    });

    expect(project).toBeTruthy();
    expect(project.name.value).toEqual('testName');
    expect(project.isPublic).toBeTruthy();
    expect(project.ownerId).toEqual('idTest');
    expect(project.createdAt).toEqual(date);
  });

  it('should create a new entity and after update the entity propieties', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const project = new Project({
      name: new ProjectName('testName'),
      isPublic: true,
      ownerId: 'idTest',
      createdAt: date as unknown as Date,
    });

    expect(project).toBeTruthy();
    expect(project.name.value).toEqual('testName');
    expect(project.isPublic).toBeTruthy();
    expect(project.ownerId).toEqual('idTest');
    expect(project.createdAt).toEqual(date);

    project.updateProject('new name', false);

    expect(project.name.value).toEqual('new name');
    expect(project.isPublic).toBeFalsy();
  });
});
