import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizedGuard } from 'src/guards/authorized.guard';
import { User } from 'src/decorators/user.decorator';

@UseGuards(AuthorizedGuard)
@Controller({ path: '/api/v1/users', version: 'v1' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/info')
  getUserById(@User() user) {
    return user.info;
  }

  @Get('session')
  getMySession(@User() user) {
    delete user.data;
    delete user.info;

    return user;
  }
}
