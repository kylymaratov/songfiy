import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SearchSongsDto } from './dto/search.songs.dto';
import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.song.dto';
import { TrendingSongsDto } from './dto/trending.songs.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('trending')
  public getTrendingSongs(@Query() query: TrendingSongsDto) {
    return this.songService.getTredning(query);
  }

  @Get('listen')
  @HttpCode(206)
  public listenSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.songService.listen(query, req, res);
  }

  @Post('search')
  @HttpCode(200)
  public searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.search(body);
  }
}
