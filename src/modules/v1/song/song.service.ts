import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
/* */
import { SearchSongsDto } from './dto/search.songs.dto';
import { ListenSongDto } from './dto/listen.song.dto';
import { TrendingSongsDto } from './dto/trending.songs.dto';
import { SearchParser } from 'src/parsers/ytb-parser/helpers/search.parser';
import { AudioParser } from 'src/parsers/ytb-parser/helpers/audio.praser';
import { ContentParser } from 'src/parsers/ytb-parser/helpers/content.parser';
import { SongTypes } from './types/song.types';
import {
  SearchSongsResponse,
  TrendingSongsRepsonse,
} from './types/song.repsonse.types';

@Injectable()
export class SongService {
  constructor(
    @Inject(SearchParser) private searchParser: SearchParser,
    @Inject(AudioParser) private audioParser: AudioParser,
    @Inject(ContentParser) private contentParser: ContentParser,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  public async getTredningSongs(
    query: TrendingSongsDto,
  ): Promise<TrendingSongsRepsonse> {
    const { regionCode = 'us', limit = 20 } = query;

    let songs: SongTypes[] | null = JSON.parse(
      await this.redis.get(`trending-${regionCode}`),
    );

    if (!songs) {
      songs = await this.contentParser.getTrendingSongs(regionCode, limit);
      await this.redis.set(`trending-${regionCode}`, JSON.stringify(songs));
    }

    return {
      title: `Trending ${songs.length} songs in country ${regionCode}`,
      songs,
    };
  }

  public async searchSongs(body: SearchSongsDto): Promise<SearchSongsResponse> {
    const { query, limit } = body;

    const songs = await this.searchParser.searchSongsByName(
      query,
      Number(limit),
    );

    return {
      title: `${songs.length} songs founded by query: ${query}`,
      songs,
    };
  }

  public async listenSong(
    query: ListenSongDto,
    req: Request,
    res: Response,
  ): Promise<void> {
    const { quality, songId } = query;

    const buffer = await this.audioParser.download(songId, quality);

    const contentLength = buffer.length;
    const contentType = 'audio/mpeg';

    let start = 0;
    let end = contentLength - 1;

    if (req.headers['range']) {
      const range = req.headers['range'].replace(/bytes=/, '').split('-');
      start = parseInt(range[0], 10);
      end =
        range[1] && parseInt(range[1], 10) < contentLength
          ? parseInt(range[1], 10)
          : end;
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', end - start + 1);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);
    res.setHeader('cache-control', 'no-store');

    Readable.from(buffer.slice(start, end + 1)).pipe(res);
  }
}
