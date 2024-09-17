import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: (err, id) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: (err, user) => void) {
    const candidate = await this.usersService.getUserById(id);
    return done(null, candidate);
  }
}
