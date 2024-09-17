import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class ServerLogger implements LoggerService {
  log(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  error(message: any, error: Error): void {
    console.error(`Message: ${message}\nError: ${error}`);
  }
}
