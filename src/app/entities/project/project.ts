import { Replace } from 'src/helpers/replace';
import { ProjectName } from './project-name';
import { randomUUID } from 'node:crypto';

export interface ProjectProps {
  name: string;
  isPublic: boolean;
  userId: string;
  createdAt: Date;
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

  public set name(name: string) {
    const validName = new ProjectName(name);
    this.props.name = validName.value;
  }

  public get name(): string {
    return this.props.name;
  }

  public set isPublic(isPublic: boolean) {
    this.props.isPublic = isPublic;
  }

  public get isPublic(): boolean {
    return this.props.isPublic;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public updateProject(name: string, isPublic: boolean) {
    const validName = new ProjectName(name);
    this.props.name = validName.value;
    this.props.isPublic = isPublic;
  }
}
