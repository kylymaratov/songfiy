import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordGenerator } from 'src/helpers/password.generator';
import { SignupDto } from './dto/signup-dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private passwordGenerator: PasswordGenerator;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepostiory: Repository<UserEntity>,
  ) {
    this.passwordGenerator = new PasswordGenerator();
  }

  async createUser(body: SignupDto): Promise<UserEntity> {
    const { email, password, firstname, lastname = '' } = body;

    const candidate = await this.userRepostiory.findOne({ where: { email } });

    if (candidate) throw new ConflictException('User exists');

    const hashedPassword = await this.passwordGenerator.generate(password);

    const user = this.userRepostiory.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
    });

    const savedUser = await this.userRepostiory.save(user);

    delete savedUser.password;

    return savedUser;
  }

  logout(req: Request, res: Response) {
    req.logout((err) => {
      if (err) throw new InternalServerErrorException();

      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.json({
          message: 'Logout successfilly',
          statusCode: HttpStatus.OK,
        });
      });
    });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | UserEntity> {
    const user = await this.userRepostiory.findOne({ where: { email } });

    if (user) {
      const isMatch = await this.passwordGenerator.match(
        password,
        user.password,
      );
      if (isMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }
}
