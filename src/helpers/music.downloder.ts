import { YoutubeAudio } from 'yt-audio-dlp';
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { Readable, Stream } from 'stream';
import { Message } from 'telegraf/typings/core/types/typegram';
import { TAudio } from 'yt-audio-dlp/dist/types/audio-types';
import { MusicEntity } from 'src/database/entities/music.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import axios from 'axios';
import { transliterate } from 'src/utils/transliterate';
import { Repository } from 'typeorm';

config();

export class MusicDownloader extends YoutubeAudio {
  private bot: Telegraf;
  private chatId: number = Number(process.env.DB_TELEGRAM);
  private telegramDownloadUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/`;

  constructor() {
    super();
    this.bot = new Telegraf(process.env.BOT_TOKEN);
  }

  async getMusicFromTelegram(musicSource: MusicSourceEntity): Promise<Buffer> {
    const connected = await this.checkConnection();

    if (!connected) await this.bot.launch();

    const file = await this.bot.telegram.getFile(
      musicSource.mediaData.audio.file_id,
    );

    const response = await axios.get(
      this.telegramDownloadUrl + file.file_path,
      {
        responseType: 'arraybuffer',
      },
    );

    return Buffer.from(response.data);
  }

  async uploadMusicToTelegram(
    music: MusicEntity,
    musicSourceRepository: Repository<MusicSourceEntity>,
  ): Promise<{ buffer: Buffer }> {
    try {
      await musicSourceRepository.save({
        id: music.musicSource.id,
        sourceName: 'telegram',
        status: 'downloading',
      });

      const buffer = await this.downloadMusic(music.musicId);

      const connected = await this.checkConnection();

      if (!connected) await this.bot.launch();

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

      music.musicSource = await musicSourceRepository.save({
        id: music.musicSource.id,
        mediaData,
        status: 'downloaded',
      });

      return { buffer };
    } catch (e) {
      await musicSourceRepository.save({
        id: music.musicSource.id,
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
      return true;
    } catch (err) {
      return false;
    }
  }
}
