import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { spawn } from 'child_process';
import Redis from 'ioredis';
//
import { URLS } from 'src/common/constants/urls';

@Injectable()
export class AudioParser {
  private upTtl: number = 86400;
  private ttl: number = 604800;

  constructor(@InjectRedis() private redis: Redis) {}

  public async download(songId: string, quality: number = 1): Promise<Buffer> {
    try {
      const cachedSong = await this.redis.getBuffer(`cached-song-[${songId}]`);

      if (cachedSong && cachedSong.length) {
        await this.redis.expire(`cached-song-[${songId}]`, this.upTtl);
        return cachedSong;
      }

      await this.redis.del(`cached-song-[${songId}]`);

      const alreadyDownloading = await this.redis.get(
        `downloading-[${songId}]`,
      );

      if (alreadyDownloading) {
        throw new Error('Song already downloading please wait');
      }

      await this.redis.set(`downloading-[${songId}]`, 'true');

      const buffer = await this.startDownload(songId, quality);

      if (!buffer.length) {
        throw new Error('Error while downloading song, please try later.');
      }

      await this.redis.setex(`cached-song-[${songId}]`, this.ttl, buffer);

      return buffer;
    } catch (error) {
      throw new ServiceUnavailableException((error as Error).message);
    } finally {
      await this.redis.del(`downloading-[${songId}]`);
    }
  }

  private startDownload(songId: string, quality: number): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      const process = spawn('yt-dlp', [
        URLS.WATCH + songId,
        '--output',
        '-',
        '--format',
        'bestaudio',
        '--no-check-certificate',
        '--extract-audio',
        '--audio-format',
        'mp3',
        '--audio-quality',
        quality.toString(),
      ]);

      process.stdout.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      process.stdout.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      process.stdout.on('error', (err) => {
        reject(
          new Error(`Process encountered an error: ${err.message || err}`),
        );
      });

      process.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Process exited with code ${code}`));
        }
      });

      process.on('error', (err) => {
        reject(
          new Error(`Process encountered an error: ${err.message || err}`),
        );
      });
    });
  }
}
