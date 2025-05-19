import * as argon2 from 'argon2';

export interface PasswordHasher {
  hash(plain: string): Promise<string>;
}

export class Argon2PasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    return argon2.hash(plain, { type: argon2.argon2id });
  }
}
