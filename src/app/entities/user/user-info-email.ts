export class UserInfoEmail {
  private email: string;

  private validateEmail(email: string): boolean {
    // verify if includes an '@' and a '.', after the dot check if have more strings
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  constructor(email: string) {
    const validEmail = this.validateEmail(email);
    if (!validEmail) throw new Error('Invalid Email');

    this.email = email;
  }

  public get value(): string {
    return this.email;
  }
}
