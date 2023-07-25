export class ProjectName {
  private name: string;

  private validateName(name: string): boolean {
    return name.length > 5 && name.length <= 20;
  }

  constructor(name: string) {
    const isValidate = this.validateName(name);
    if (!isValidate) throw new Error('invalid name');

    this.name = name;
  }

  public get value(): string {
    return this.name;
  }
}
