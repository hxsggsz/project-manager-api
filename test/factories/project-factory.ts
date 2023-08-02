import { Project, ProjectProps } from '../../src/app/entities/project/project';
import { Override } from '../../src/helpers/override';

export function makeProject(override: Override<ProjectProps> = {}): Project {
  return new Project({
    name: 'name test',
    isPublic: true,
    userId: 'user123',
    ...override,
  });
}
