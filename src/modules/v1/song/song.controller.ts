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
/* */
import { SearchSongsDto } from './dto/search.songs.dto';
import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.song.dto';
import { TrendingSongsDto } from './dto/trending.songs.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @ApiResponse({ status: 200, description: 'Returned top songs by region' })
  @Get('trending')
  @HttpCode(200)
  public getTrendingSongs(@Query() query: TrendingSongsDto) {
    return this.songService.getTredningSongs(query);
  }

  @ApiResponse({ status: 206, description: 'Returned chunks for listening' })
  @Get('listen')
  @HttpCode(206)
  public listenSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.songService.listenSong(query, req, res);
  }

  @ApiResponse({ status: 206, description: 'Returned finded songs by name' })
  @Post('search')
  @HttpCode(200)
  public searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.searchSongs(body);
  }
}
