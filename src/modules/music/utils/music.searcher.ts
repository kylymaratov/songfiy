import { musicKeywoards } from 'src/constants/music-keywoard';
import { Client, VideoCompact } from 'youtubei';

export interface TMusic {
  musicId: string;
  originalTitle: string;
  title: string;
  artist: string;
  author: string;
  duration: number;
  uploadDate: string;
  isMusic: boolean;
  isOfficial: boolean;
}

export class MusicSearcher extends Client {
  private defaultLimit: number = 15;
  private acceptableMusicDuration = 1000;
  private regex: RegExp[] = [
    / *\([^)]*\) */g,
    / *\[[^\]]*\] */g,
    / *\{[^}]*\} */g,
    / *<[^>]*> */g,
    /\s{2,}/g,
  ];

  constructor() {
    super();
  }

  private async musicCheck(video: VideoCompact): Promise<boolean> {
    const checkDuration = (): boolean => {
      return video.duration <= this.acceptableMusicDuration;
    };

    const checkByTitle = (): boolean => {
      return musicKeywoards.some((keywoard) => video.title.includes(keywoard));
    };

    return checkDuration() && checkByTitle();
  }

  private getAuthorAndTitle(video: VideoCompact): {
    author: string;
    title: string;
    artist: string;
  } {
    const author = video.channel?.name.trim() || 'Unknown';
    const clearedOriginalTitle = this.regex
      .reduce((acc, regex) => acc.replace(regex, ''), video.title)
      .split('-');

    return {
      author,
      title: clearedOriginalTitle[1],
      artist: clearedOriginalTitle[0].trim() || 'Unknown',
    };
  }

  private async formatVideo(video: VideoCompact): Promise<TMusic> {
    const isMusic = await this.musicCheck(video);
    const { author, title, artist } = this.getAuthorAndTitle(video);

    return {
      musicId: video.id,
      originalTitle: video.title,
      title,
      author,
      artist,
      duration: video.duration as number,
      uploadDate: video.uploadDate,
      isMusic,
      isOfficial: author === artist,
    };
  }

  public async searchMusic(
    query: string,
    limit: number = this.defaultLimit,
  ): Promise<TMusic[]> {
    const data = await this.search(query, { type: 'video' });

    const items: VideoCompact[] = data.items;
    const songs: TMusic[] = [];

    for (let i = 0; i < items.length; i++) {
      if (i >= limit) break;

      if (items[i].isLive) continue;
      if (items[i].id === 'didyoumean') continue;

      const formated: TMusic = await this.formatVideo(items[i]);

      if (formated && formated.isMusic) {
        songs.push(formated);
      }
    }

    return songs;
  }
}
