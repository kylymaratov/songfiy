import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from './music.entity';

@Entity({ name: 'music-statistic' })
export class MusicStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { array: true, default: [] })
  likes: number[];

  @Column({ default: 0 })
  listenCount: number;

  @OneToOne(() => MusicEntity, (music) => music.stat)
  music: MusicEntity;
}
