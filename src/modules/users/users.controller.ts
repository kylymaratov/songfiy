import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthorizedGuard } from 'src/guards/authorized.guard';

@UseGuards(AuthorizedGuard)
@Controller({ path: '/api/v1/users', version: 'v1' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/info/:id')
  getUserById(@Param() param: { id: number }) {
    return this.usersService.getUserById(param.id);
  }

  @Get('session')
  getMySession(@Req() req: Request) {
    return req.session;
  }
}
