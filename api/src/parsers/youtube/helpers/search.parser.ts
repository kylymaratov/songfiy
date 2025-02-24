import { Inject, Injectable } from '@nestjs/common';
import { SONG_TITLE_KEYOWARDS } from 'src/common/constants/keywoards';
import { REGEXP } from 'src/common/constants/regexp';
import { ConvertUtil } from 'src/common/utils/convert.util';
import { Client, Video, VideoCompact } from 'youtubei';

@Injectable()
export class SearchParser {
  private readonly MAX_SONG_DURATION: number = 420;
  private readonly MIN_SONG_DURATION: number = 60;
  private readonly client: Client = new Client();

  constructor(@Inject(ConvertUtil) private convertion: ConvertUtil) {}

  public searchSameSongs() {}

  public async searchSongsByName(query: string, limit: number) {
    const videos = await this.client.search(query, { type: 'video' });

    const songs = await this.convert(videos.items, limit);

    return songs;
  }

  private async convert(videos: Video[] | VideoCompact[], limit: number = 15) {
    const songs = [];

    for (const [index, video] of videos.entries()) {
      if (index >= limit) break;

      if (video instanceof VideoCompact && video.isLive) continue;
      if (video.id === 'didyoumean') continue;
      if (!this.isSong(video)) continue;

      const song = this.convertVideoToSong(video);

      songs.push(song);
    }

    return songs;
  }

  private convertVideoToSong(video: VideoCompact | Video) {
    const { author, title, artist } = this.exctractNamesFromTitle(video);
    const uploadDate = video.uploadDate
      ? this.convertion.convertDate(video.uploadDate)
      : null;

    return {
      title,
      author,
      artist,
      uploadDate,
      duration: video.duration as number,
      songId: video.id,
      originalTitle: video.title,
      isOfficial: author === artist,
    };
  }

  private exctractNamesFromTitle(video: Video | VideoCompact) {
    const author = video.channel?.name.trim() || null;
    const clearedOrirignalTitle = REGEXP.CLEAT_TITLE.reduce(
      (acc, regex) => acc.replace(regex, ''),
      video.title,
    ).split('-');

    return {
      author,
      title: clearedOrirignalTitle[1]?.trim() || null,
      artist: clearedOrirignalTitle[0].trim() || null,
    };
  }

  private isSong(video: Video | VideoCompact) {
    const checkDuration = (): boolean => {
      return (
        video.duration <= this.MAX_SONG_DURATION &&
        video.duration >= this.MIN_SONG_DURATION
      );
    };

    const checkByTitle = (): boolean => {
      return SONG_TITLE_KEYOWARDS.some((keywoard) =>
        video.title.includes(keywoard),
      );
    };

    return checkDuration() && checkByTitle();
  }
}
