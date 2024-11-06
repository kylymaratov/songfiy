import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class ListneSongGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    return true;
  }
}