export class UserAlreadyRegistered extends Error {
  constructor() {
    super('this user is already register');
  }
}
