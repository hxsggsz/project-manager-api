export class UserInfoProfilePhoto {
  private profilePhoto: string;

  private validatePhoto(url: string): boolean {
    // verify if is an valid url
    const photoRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    return photoRegex.test(url);
  }

  constructor(profilePhoto: string) {
    const validPhoto = this.validatePhoto(profilePhoto);
    if (!validPhoto) throw new Error('Invalid Photo url');

    this.profilePhoto = profilePhoto;
  }

  public get value(): string {
    return this.profilePhoto;
  }
}
