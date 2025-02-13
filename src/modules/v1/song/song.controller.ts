import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
//
import { SearchSongsDto } from './dto/search.songs.dto';
import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.song.dto';
import { TrendingSongsDto } from './dto/trending.songs.dto';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('trending')
  public getTrendingSongs(@Query() query: TrendingSongsDto) {
    return this.songService.getTredningSongs(query);
  }

  @Get('listen')
  @HttpCode(206)
  public listenSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.songService.listenSong(query, req, res);
  }

  @Post('search')
  @HttpCode(200)
  public searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.searchSongs(body);
  }
}
