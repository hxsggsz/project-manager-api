import { ProjectName } from '../../src/app/entities/project/project-name';
import { Project, ProjectProps } from '../../src/app/entities/project/project';
import { Override } from '../../src/helpers/override';

export function makeProject(override: Override<ProjectProps> = {}): Project {
  return new Project({
    name: new ProjectName('name test'),
    isPublic: true,
    ownerId: 'owneruuid',
    ...override,
  });
}
