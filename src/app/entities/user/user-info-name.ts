export class UserInfoName {
  private name: string;

  private validateName(name: string): boolean {
    return name.length > 3 && name.length <= 8;
  }

  constructor(name: string) {
    const validName = this.validateName(name);
    if (!validName) throw new Error('Invalid name');

    this.name = name;
  }

  public get value(): string {
    return this.name;
  }
}
