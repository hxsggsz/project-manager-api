import { ProjectName } from './project-name';

describe('project Name class', () => {
  it('should create a new ProjectName correclty', () => {
    const projectName = new ProjectName('testName');

    expect(projectName).toBeTruthy();
    expect(projectName.value).toEqual('testName');
  });

  it('should get a validation error with name less than 5 characters', () => {
    expect(() => new ProjectName('less')).toThrow();
  });

  it('should get a validation error with name more than 20 characters', () => {
    expect(() => new ProjectName('a'.repeat(21))).toThrow();
  });
});
