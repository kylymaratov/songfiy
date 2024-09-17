import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AuthorizedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return request.isAuthenticated();
  }
}
