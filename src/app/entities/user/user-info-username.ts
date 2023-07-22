export class UserInfoUsername {
  private username: string;

  private validateUsername(username: string): boolean {
    return username.length > 3 && username.length <= 15;
  }

  constructor(username: string) {
    const validUsername = this.validateUsername(username);
    if (!validUsername) throw new Error('Invalid Username');

    this.username = username;
  }

  public get value(): string {
    return this.username;
  }
}
