import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlaylistBodyDto } from './dto/create.playlist.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistEntity } from 'src/database/entities/playlist.entity';
import { AddToPlaylistBodyDto } from './dto/add.playlist.dto';
import { MusicEntity } from 'src/database/entities/music.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async getPlaylist(user: UserEntity, id: number) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: Number(id) },
      relations: ['userData'],
    });

    if (!playlist) throw new NotFoundException();

    if (playlist.isPrivate && user.data.id !== playlist.userData.id)
      throw new ForbiddenException();

    delete playlist.userData;

    return playlist;
  }

  async createPlaylist(user: UserEntity, body: CreatePlaylistBodyDto) {
    const playlistCount = await this.playlistRepository.count({
      where: { userData: user.data },
    });

    if (playlistCount >= 100) throw new BadRequestException();

    const newPlaylist = this.playlistRepository.create({
      userData: user.data,
      name: body.name,
      musicIds: [],
      isPrivate: body.isPrivate,
    });

    const savedPlaylist = await this.playlistRepository.save(newPlaylist);

    delete savedPlaylist.userData;

    return savedPlaylist;
  }

  async deletePlaylist(user: UserEntity, id: number) {
    const result = await this.playlistRepository
      .createQueryBuilder()
      .delete()
      .from(PlaylistEntity)
      .where('id = :id AND "userDataId" = :userId', {
        id,
        userId: user.data.id,
      })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException(
        'You are not the creator of this playlist or playlist not found',
      );
    }

    return { deletedId: id };
  }

  async addToPlayist(user: UserEntity, body: AddToPlaylistBodyDto) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: body.playlistId, userData: user.data },
    });

    if (!playlist) throw new NotFoundException();

    for (const musicId of body.musicIds) {
      if (playlist.musicIds.includes(musicId)) continue;

      const exs = await this.musicRepository.exists({ where: { musicId } });

      if (!exs) continue;

      playlist.musicIds.push(musicId);
    }

    await this.playlistRepository.save(playlist);

    return playlist;
  }

  async getMyPlaylists(user: UserEntity) {
    const playlists = await this.playlistRepository.find({
      where: { userData: user.data },
    });

    return playlists;
  }
}
