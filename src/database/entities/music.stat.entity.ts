import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from './music.entity';

@Entity({ name: 'music-statistic' })
export class MusicStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  listenCount: number;

  @OneToOne(() => MusicEntity, (music) => music.stat)
  music: MusicEntity;
}
