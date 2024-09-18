import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class ServerLogger implements LoggerService {
  log(message: string): void {
    console.log(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  error(error: Error): void {
    console.error(`Error: ${error}`);
  }
}
