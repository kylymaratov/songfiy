import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/database/entities/playlist.entity';
import { UserDataEntity } from 'src/database/entities/user.data.entity';
import { MusicEntity } from 'src/database/entities/music.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistEntity, UserDataEntity, MusicEntity]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
