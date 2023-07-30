import { User, UserProps } from '../../src/app/entities/user/user';
import { Override } from '../../src/helpers/override';

export function makeUser(override: Override<UserProps> = {}): User {
  return new User({
    name: 'test',
    username: 'username',
    email: 'test@gmail.com',
    profilePhoto: 'https://image.com',
    password: 'teste!A1',
    ...override,
  });
}
