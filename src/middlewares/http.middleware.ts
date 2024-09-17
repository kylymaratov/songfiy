import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { ServerLogger } from 'src/server/server.logger';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new ServerLogger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = +new Date();

    response.on('close', () => {
      const endTime = +new Date();
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      const requestDuration = endTime - startTime;

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} | ${requestDuration}ms`,
      );
    });

    next();
  }
}
