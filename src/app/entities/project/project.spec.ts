import { Project } from './project';

describe('projects entity', () => {
  it('should create a new entity correctly', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const project = new Project({
      name: 'testName',
      isPublic: true,
      userId: 'idTest',
      createdAt: date as unknown as Date,
    });

    expect(project).toBeTruthy();
    expect(project.name).toEqual('testName');
    expect(project.isPublic).toBeTruthy();
    expect(project.userId).toEqual('idTest');
    expect(project.createdAt).toEqual(date);
  });

  it('should create a new entity and after update the entity propieties', () => {
    const date = jest.fn().mockReturnValue(new Date());

    const project = new Project({
      name: 'testName',
      isPublic: true,
      userId: 'idTest',
      createdAt: date as unknown as Date,
    });

    expect(project).toBeTruthy();
    expect(project.name).toEqual('testName');
    expect(project.isPublic).toBeTruthy();
    expect(project.userId).toEqual('idTest');
    expect(project.createdAt).toEqual(date);

    project.updateProject('new name', false);

    expect(project.name).toEqual('new name');
    expect(project.isPublic).toBeFalsy();
  });
});
