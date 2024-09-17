import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup-dto';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthorizedGuard } from 'src/guards/authorized.guard';

@Controller({ path: '/api/v1/auth', version: 'v1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthorizedGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req: Request) {
    return {
      message: 'Login successfilly',
      statusCode: HttpStatus.OK,
      user: req.user,
    };
  }

  @Post('signup')
  @HttpCode(201)
  signup(@Body() body: SignupDto) {
    return this.authService.createUser(body);
  }
}
