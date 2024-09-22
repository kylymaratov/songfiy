import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MusicSourceEntity } from './music.source.entity';
import { MusicCacheEntity } from './music.cache.entity';
import { MusicStatEntity } from './music.stat.entity';

@Entity({ name: 'music' })
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
  @OneToOne(() => MusicSourceEntity, (source) => source.music, {
    cascade: ['insert', 'remove'],
    nullable: false,
  })
  source: MusicSourceEntity;

  @JoinColumn()
  @OneToOne(() => MusicCacheEntity, (cache) => cache.music, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  cache: MusicCacheEntity | null;

  @JoinColumn()
  @OneToOne(() => MusicStatEntity, (stat) => stat.music, {
    cascade: ['insert', 'remove'],
    nullable: false,
  })
  stat: MusicStatEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
