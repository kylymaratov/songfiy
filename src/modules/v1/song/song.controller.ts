import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { serverEnv } from 'src/server/server.env';
import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.dto';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { SearchSongsDto } from './dto/search.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { LikeSongDto } from './dto/like.dto';
import { GetSongDto } from './dto/getsong.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@ApiTags('song')
@Controller(`/api/${serverEnv.sv}/song`)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/')
  getSongById(@Query() query: GetSongDto) {
    return this.songService.getSongById(query);
  }

  @Get('top-listened')
  getTopListenedSongs() {
    return this.songService.getTopListenedSongs();
  }

  @Get('top')
  getTopSongs() {
    return this.songService.getTopSongs();
  }

  @Post('download')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async downloadSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { buffer, metadata } = await this.songService.listen(query);
    const contentLength = metadata.file_size;
    const contentType = metadata.mime_type;

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', contentLength);

    return Readable.from(buffer).pipe(res);
  }

  @Get('listen')
  @HttpCode(206)
  @UseGuards(JwtAuthGuard)
  async listenSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { buffer, metadata } = await this.songService.listen(query);
    const contentLength = metadata.file_size;
    const contentType = metadata.mime_type;

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

    if (start === 0) {
      this.songService.icnListenCount(query.songId);
    }

    res.setHeader('Content-Length', end - start + 1);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);

    return Readable.from(buffer.slice(start, end + 1)).pipe(res);
  }

  @Post('search')
  @HttpCode(200)
  searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.search(body);
  }

  @Put('like')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  likeSong(@CurrentUser() user: UserEntity, @Query() query: LikeSongDto) {
    const { songId } = query;
    return this.songService.like(user, songId);
  }
}
