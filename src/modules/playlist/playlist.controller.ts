import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { AuthorizedGuard } from 'src/guards/authorized.guard';
import { CreatePlaylistBodyDto } from './dto/create.playlist.dto';
import { Request } from 'express';
import { UserEntity } from 'src/database/entities/user.entity';
import { AddToPlaylistBodyDto } from './dto/add.playlist.dto';

@UseGuards(AuthorizedGuard)
@Controller({ path: '/api/v1/playlist', version: 'v1' })
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Get('my')
  getMyPlaylists(@Req() req: Request) {
    const user = req.user as UserEntity;

    return this.playlistService.getMyPlaylists(user);
  }

  @Get('info/:id')
  getPlaylist(@Req() req: Request, @Param() param: { id: number }) {
    const user = req.user as UserEntity;

    return this.playlistService.getPlaylist(user, param.id);
  }

  @Post('create')
  createPlaylist(@Req() req: Request, @Body() body: CreatePlaylistBodyDto) {
    const user = req.user as UserEntity;

    return this.playlistService.createPlaylist(user, body);
  }

  @Put('add')
  addToPlaylist(@Req() req: Request, @Body() body: AddToPlaylistBodyDto) {
    const user = req.user as UserEntity;

    return this.playlistService.addToPlayist(user, body);
  }

  @Delete('delete/:id')
  deletePlaylist(@Req() req: Request, @Param() param: { id: number }) {
    const user = req.user as UserEntity;

    return this.playlistService.deletePlaylist(user, param.id);
  }
}
