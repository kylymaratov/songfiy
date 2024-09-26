import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserDataEntity } from './user.data.entity';

@Entity('playlist')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true })
  playlistId: string;

  @Column()
  name: string;

  @Column('text', { array: true, default: [] })
  musicIds: string[];

  @Column({ default: 0 })
  listenCount: number;

  @Column('int', { array: true, default: [] })
  likes: number[];

  @Column()
  isPrivate: boolean;

  @ManyToOne(() => UserDataEntity, (userData) => userData.playlists, {
    nullable: false,
  })
  userData: UserDataEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
