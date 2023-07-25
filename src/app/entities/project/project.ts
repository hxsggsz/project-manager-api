import { Replace } from 'src/helpers/replace';
import { ProjectName } from './project-name';
import { randomUUID } from 'node:crypto';

interface ProjectProps {
  name: ProjectName;
  createdAt: Date;
  ownerId: string;
}
export class Project {
  private _id: string;
  private props: ProjectProps;

  constructor(props: Replace<ProjectProps, { createdAt?: Date }>, id?: string) {
    this._id = id ? id : randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: ProjectName) {
    this.props.name = name;
  }

  public get name(): ProjectName {
    return this.props.name;
  }

  public set ownerId(ownerId: string) {
    this.props.ownerId = ownerId;
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
