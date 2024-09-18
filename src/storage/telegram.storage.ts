import { YoutubeAudio } from 'yt-audio-dlp';
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { Readable } from 'stream';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import axios from 'axios';
import { transliterate } from 'src/utils/transliterate';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

config();

export class TelegramStorage extends YoutubeAudio {
  private bot: Telegraf;
  private chatId: number = Number(process.env.DB_TELEGRAM);
  private telegramDownloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/`;

  constructor(
    @InjectRepository(MusicSourceEntity)
    private musicSourceRepository: Repository<MusicSourceEntity>,
  ) {
    super();
    this.bot = new Telegraf(process.env.BOT_TOKEN);
  }

  async getMusic(source: MusicSourceEntity): Promise<Buffer> {
    await this.checkConnection();

    const file = await this.bot.telegram.getFile(
      source.mediaData.audio.file_id,
    );

    const response = await axios.get(
      this.telegramDownloadUrl + file.file_path,
      {
        responseType: 'arraybuffer',
      },
    );

    return Buffer.from(response.data);
  }

  async uploadMusic(music: MusicEntity): Promise<{ buffer: Buffer }> {
    try {
      await this.musicSourceRepository.save({
        id: music.source.id,
        sourceName: 'telegram',
        status: 'downloading',
      });

      const buffer = await this.downloadMusic(music.musicId);

      await this.checkConnection();

      const mediaData = await this.bot.telegram.sendAudio(
        this.chatId,
        {
          source: Readable.from(buffer),
          filename: transliterate(music.originalTitle),
        },
        {
          title: music.title,
          performer: music.author,
          thumbnail: {
            url: `https://i3.ytimg.com/vi/${music.musicId}/hqdefault.jpg`,
          },
        },
      );

      music.source = await this.musicSourceRepository.save({
        id: music.source.id,
        mediaData,
        status: 'downloaded',
      });

      return { buffer };
    } catch (e) {
      await this.musicSourceRepository.save({
        id: music.source.id,
        status: 'saved',
      });

      throw e;
    }
  }

  private async downloadMusic(musicId: string): Promise<Buffer> {
    try {
      const { buffer } = await this.getAudioById(musicId, {
        outputFormat: 'mp3',
      });
      return buffer;
    } catch (error) {
      try {
        const { buffer } = await this.getAudioById(musicId, {
          socks: 'socks5://127.0.0.1:9050',
        });
        return buffer;
      } catch (error) {
        throw error;
      }
    }
  }

  private async checkConnection() {
    try {
      await this.bot.telegram.getMe();
    } catch (err) {
      await this.bot.launch();
    }
  }
}
