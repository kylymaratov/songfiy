import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepostiry: Repository<UserEntity>,
  ) {}

  async getUserById(id: number): Promise<UserEntity | null> {
    const user = await this.userRepostiry.findOne({
      where: { id },
      relations: ['data', 'info'],
    });

    return user;
  }
}
