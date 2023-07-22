export class UserInfoPassword {
  private password: string;

  private validatePassword(password: string): boolean {
    // verify if includes lowerCase and uperCase char, a number and a special char
    const passwordRegex =
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return passwordRegex.test(password);
  }

  constructor(password: string) {
    const validPassword = this.validatePassword(password);
    if (!validPassword) throw new Error('Invalid Password');

    this.password = password;
  }

  public get value(): string {
    return this.password;
  }
}
