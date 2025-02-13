import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios from 'axios';
import { SongTypes } from 'src/modules/v1/song/types/song.types';
import { Client } from 'youtubei';
import { REGEXP } from 'src/parsers/constants/regexp';
import { ConvertUtil } from 'src/parsers/utils/convert.util';
import { YoutubeTrendingParseResult } from '../types/youtube.api.types';
import { URLS } from 'src/parsers/constants/urls';
import { serverEnv } from 'src/common/server/server.env';

@Injectable()
export class ContentParser {
  private client: Client = new Client();

  constructor(@Inject(ConvertUtil) private convertion: ConvertUtil) {}

  /* Dont work */
  /*public async getSongInfo(songId: string) {
    const song = await this.client.getVideo(songId);

     song.title = this.convertion.convertCyrilicLatin(song.title);

    return song;
   }*/

  public async getTrendingSongs(
    regionCode: string,
    limit: number,
  ): Promise<SongTypes[]> {
    try {
      const response = await axios.get<YoutubeTrendingParseResult>(
        `${
          URLS.YOUTUBE_API
        }/videos?part=snippet,statistics,contentDetails&chart=mostPopular&videoCategoryId=10&regionCode=${regionCode}&maxResults=${limit}&key=${serverEnv.env.YOUTUBE_API_KEY}`,
      );

      return this.formatData(response.data);
    } catch {
      throw new ServiceUnavailableException(
        'Service unavialable, please try later',
      );
    }
  }

  private formatData(data: YoutubeTrendingParseResult): SongTypes[] {
    return data.items.map((item) => {
      const { artist, author, title } = this.exctractNamesFromTitle(
        item.snippet.title,
        item.snippet.channelTitle,
      );

      return {
        songId: item.id,
        artist,
        author,
        title,
        originalTitle: item.snippet.title,
        duration: this.convertion.convertIsoDuration(
          item.contentDetails.duration,
        ),
        isDownloading: false,
        isOfficial: false,
        uploadDate: item.snippet.publishedAt,
      };
    });
  }

  private exctractNamesFromTitle(title: string, author: string | null) {
    const clearedOrirignalTitle = REGEXP.CLEAT_TITLE.reduce(
      (acc, regex) => acc.replace(regex, ''),
      title,
    ).split('-');

    return {
      author,
      title: clearedOrirignalTitle[1]?.trim() || null,
      artist: clearedOrirignalTitle[1]
        ? clearedOrirignalTitle[0]?.trim()
        : null,
    };
  }
}
