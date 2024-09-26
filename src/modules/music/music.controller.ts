import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { SearchMusicDto } from './dto/search.music.dto';
import { GetMusicByIdParamDto } from './dto/get.music.dto';
import { AuthorizedGuard } from 'src/guards/authorized.guard';
import { Request, Response } from 'express';
import { Readable } from 'stream';

@Controller({ path: '/api/v1/music', version: 'v1' })
export class MusicController {
  constructor(private musicService: MusicService) {}

  @Post('search')
  @HttpCode(200)
  searchMusic(@Body() body: SearchMusicDto) {
    return this.musicService.searchMusic(body);
  }

  @Get('/for-relax')
  getMusicForRelax() {
    return this.musicService.getMusicForRelax();
  }

  @UseGuards(AuthorizedGuard)
  @Get('info/:musicId')
  @HttpCode(200)
  getMusicById(@Param() param: GetMusicByIdParamDto) {
    const { musicId } = param;

    return this.musicService.getMusicById(musicId);
  }

  @Get('/random')
  @HttpCode(200)
  getRandomMusic(@Query() query: { limit: number }) {
    return this.musicService.getRandomMusic(query.limit);
  }

  @Get('top')
  @HttpCode(200)
  getTopMusic(@Query() query: { limit: number }) {
    return this.musicService.getTopMusic(query.limit);
  }

  @Get('most-played')
  @HttpCode(200)
  getMostPlayedMusic(@Query() query: { limit: number }) {
    return this.musicService.getMostPlayedMusic(query.limit);
  }

  @Get('listen/:musicId')
  @HttpCode(206)
  async listenMusic(
    @Param() param: { musicId: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { musicId } = param;

    const { music, buffer } = await this.musicService.listenMusic(musicId);
    const contentLength = music.source.mediaData.audio.file_size;
    const contentType = music.source.mediaData.audio.mime_type;

    res.setHeader('Content-Type', contentType);

    if (!req.headers['range']) {
      res.setHeader('Content-Length', contentLength);
      return Readable.from(buffer).pipe(res);
    }

    const range = req.headers['range'].replace(/bytes=/, '').split('-');
    const start = parseInt(range[0], 10);
    const end = range[1] ? parseInt(range[1], 10) : contentLength - 1;

    res.setHeader('Content-Length', start - end);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);
    res.setHeader('Accept-Ranges', 'bytes');

    return Readable.from(buffer.slice(start, end + 1)).pipe(res);
  }
}
