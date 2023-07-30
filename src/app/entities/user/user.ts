import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { UserInfoName } from './user-info-name';
import { UserInfoUsername } from './user-info-username';
import { UserInfoProfilePhoto } from './user-info-profile-photo';
import { UserInfoEmail } from './user-info-email';
import { UserInfoPassword } from './user-info-password';

export interface UserProps {
  name: string;
  githubId?: string | null;
  linkedinId?: string | null;
  username: string;
  profilePhoto: string;
  email?: string | null;
  password?: string | null;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
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
    const validName = new UserInfoName(name);
    this.props.name = validName.value;
  }

  public get name(): string {
    return this.props.name;
  }

  public set username(username: string) {
    const validUsername = new UserInfoUsername(username);
    this.props.username = validUsername.value;
  }

  public get username(): string {
    return this.props.username;
  }

  public set profilePhoto(profilePhoto: string) {
    const validPhoto = new UserInfoProfilePhoto(profilePhoto);
    this.props.profilePhoto = validPhoto.value;
  }

  public get profilePhoto(): string {
    return this.props.profilePhoto;
  }

  public set email(email: string) {
    const validEmail = new UserInfoEmail(email);
    this.props.email = validEmail.value;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    const validPassword = new UserInfoPassword(password);
    this.props.password = validPassword.value;
  }

  public get password(): string {
    return this.props.password;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set githubId(githubId: string) {
    this.props.githubId = githubId;
  }

  public get githubId(): string {
    return this.props.githubId;
  }

  public set linkedinId(linkedinId: string) {
    this.props.linkedinId = linkedinId;
  }

  public get linkedinId(): string {
    return this.props.linkedinId;
  }

  public updateUser(username: string, name: string, profilePhoto: string) {
    this.username = username;
    this.name = name;
    this.profilePhoto = profilePhoto;
  }
}
