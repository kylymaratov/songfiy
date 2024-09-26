import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity('user-data')
export class UserDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  listenedCount: number;

  @Column({ nullable: true })
  listenNow: string;

  @Column('text', { array: true, default: [] })
  favorites: string[];

  @JoinColumn()
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.userData, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  playlists: PlaylistEntity[];

  @OneToOne(() => UserEntity, (user) => user.data, { nullable: false })
  user: UserEntity;
}
