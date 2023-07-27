import { Replace } from 'src/helpers/replace';
import { ProjectName } from './project-name';
import { randomUUID } from 'node:crypto';

export interface ProjectProps {
  name: string;
  createdAt: Date;
  ownerId: string;
  isPublic: boolean;
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

  public set ownerId(ownerId: string) {
    this.props.ownerId = ownerId;
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }

  public set isPublic(isPublic: boolean) {
    this.props.isPublic = isPublic;
  }

  public get isPublic(): boolean {
    return this.props.isPublic;
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
