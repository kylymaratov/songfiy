import { IsByteLength, IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsByteLength(8, 100)
  password: string;

  @IsNotEmpty()
  firstname: string;

  lastname: string;
}
