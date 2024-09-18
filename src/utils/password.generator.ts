import * as bcrypt from 'bcrypt';

export class PasswordGenerator {
  private saltRounds: number = 12;

  generate(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, this.saltRounds, (err, password) => {
        if (err) return reject(err);

        resolve(password);
      });
    });
  }

  match(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) return reject(err);

        resolve(isMatch);
      });
    });
  }
}
