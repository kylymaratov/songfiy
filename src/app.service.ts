import { Injectable } from '@nestjs/common';
import { serverEnv } from './server/server.env';
import * as crypto from 'crypto';

@Injectable()
export class AppService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly secretKey = process.env.APP_SECRET;
  private readonly iv = crypto.randomBytes(16);

  private encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  getServerEnv() {
    return {
      BOT_TOKEN: this.encrypt(process.env.BOT_TOKEN || ''),
      CHAT_ID: this.encrypt(process.env.TELEGRAM_CHAT_ID || ''),
    };
  }
}