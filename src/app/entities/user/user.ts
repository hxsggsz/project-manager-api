import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { UserInfoName } from './user-info-name';
import { UserInfoUsername } from './user-info-username';
import { UserInfoProfilePhoto } from './user-info-profile-photo';
import { UserInfoEmail } from './user-info-email';
import { UserInfoPassword } from './user-info-password';

export interface UserProps {
  name: UserInfoName;
  githubId?: string | null;
  linkedinId?: string | null;
  username: UserInfoUsername;
  profilePhoto: UserInfoProfilePhoto;
  email: UserInfoEmail;
  password: UserInfoPassword;
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

  public set name(name: UserInfoName) {
    this.props.name = name;
  }

  public get name(): UserInfoName {
    return this.props.name;
  }

  public set username(username: UserInfoUsername) {
    this.props.username = username;
  }

  public get username(): UserInfoUsername {
    return this.props.username;
  }

  public set profilePhoto(profilePhoto: UserInfoProfilePhoto) {
    this.props.profilePhoto = profilePhoto;
  }

  public get profilePhoto(): UserInfoProfilePhoto {
    return this.props.profilePhoto;
  }

  public set email(email: UserInfoEmail) {
    this.props.email = email;
  }

  public get email(): UserInfoEmail {
    return this.props.email;
  }

  public set password(password: UserInfoPassword) {
    this.props.password = password;
  }

  public get password(): UserInfoPassword {
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

  public updateUser(
    username: UserInfoUsername,
    name: UserInfoName,
    profilePhoto: UserInfoProfilePhoto,
  ) {
    this.username = username;
    this.name = name;
    this.profilePhoto = profilePhoto;
  }
}
