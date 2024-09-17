import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MusicSourceEntity } from './music.source.entity';
import { MusicCacheEntity } from './music.cache.entity';

@Entity({ name: 'musics' })
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  musicId: string;

  @Column()
  originalTitle: string;

  @Column({ nullable: true })
  title: string;

  @Column()
  artist: string;

  @Column()
  author: string;

  @Column()
  duration: number;

  @Column()
  uploadDate: string;

  @Column()
  isOfficial: boolean;

  @JoinColumn()
  @OneToOne(() => MusicSourceEntity, (musicSource) => musicSource.music, {
    cascade: true,
  })
  musicSource: MusicSourceEntity;

  @JoinColumn()
  @OneToOne(() => MusicCacheEntity, (file) => file.music, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  cache: MusicCacheEntity | null;
}
