import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { AuthorizedGuard } from 'src/guards/authorized.guard';
import { CreatePlaylistBodyDto } from './dto/create.playlist.dto';
import { AddToPlaylistBodyDto } from './dto/add.playlist.dto';
import { User } from 'src/decorators/user.decorator';

@UseGuards(AuthorizedGuard)
@Controller({ path: '/api/v1/playlist', version: 'v1' })
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Get('my')
  getMyPlaylists(@User() user) {
    return this.playlistService.getMyPlaylists(user);
  }

  @Get('public')
  getPublicPlaylists() {
    return this.playlistService.getPublicPlaylists();
  }

  @Get('info/:playlistId')
  getPlaylist(@User() user, @Param() param: { playlistId: string }) {
    return this.playlistService.getPlaylist(user, param.playlistId);
  }

  @Post('create')
  createPlaylist(@User() user, @Body() body: CreatePlaylistBodyDto) {
    return this.playlistService.createPlaylist(user, body);
  }

  @Put('add')
  addToPlaylist(@User() user, @Body() body: AddToPlaylistBodyDto) {
    return this.playlistService.addToPlayist(user, body);
  }

  @Delete('delete/:playlistId')
  deletePlaylist(@User() user, @Param() param: { playlistId: string }) {
    return this.playlistService.deletePlaylist(user, param.playlistId);
  }
}
