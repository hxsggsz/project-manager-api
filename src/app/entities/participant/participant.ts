import { Replace } from 'src/helpers/replace';
import { randomUUID } from 'node:crypto';

export interface ParticipantProps {
  name: string;
  username: string;
  profilePhoto: string;
  makePartAt: Date;
  projectId: string;
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
  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get username(): string {
    return this.props.username;
  }

  public set username(username: string) {
    this.props.username = username;
  }

  public get profilePhoto(): string {
    return this.props.profilePhoto;
  }

  public set profilePhoto(profilePhoto: string) {
    this.props.profilePhoto = profilePhoto;
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
}
