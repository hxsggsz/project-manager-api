import { Replace } from 'src/helpers/replace';
import { randomUUID } from 'node:crypto';

export type RoleTypes = 'user' | 'admin' | 'owner';

export interface ParticipantProps {
  userId: string;
  makePartAt: Date;
  projectId: string;
  role: RoleTypes;
}

export class Participant {
  private _id: string;
  private props: ParticipantProps;

  constructor(
    props: Replace<ParticipantProps, { makePartAt?: Date }>,
    id?: string,
  ) {
    this._id = id ? id : randomUUID();
    this.props = {
      ...props,
      makePartAt: props.makePartAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }
  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get makePartAt(): Date {
    return this.props.makePartAt;
  }

  public set makePartAt(makePartAt: Date) {
    this.props.makePartAt = makePartAt;
  }

  public get projectId(): string {
    return this.props.projectId;
  }

  public set projectId(projectId: string) {
    this.props.projectId = projectId;
  }

  public get role(): string {
    return this.props.role;
  }

  public set role(role: RoleTypes) {
    this.props.role = role;
  }
}
