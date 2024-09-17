import { Message } from 'telegraf/typings/core/types/typegram';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from './music.entity';
import { MusicSourceEntity } from './music.source.entity';

@Entity({ name: 'music-cache' })
export class MusicCacheEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  buffer: Buffer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastAccessed: Date;

  @OneToOne(() => MusicEntity, (music) => music.cache)
  music: MusicEntity;
}
