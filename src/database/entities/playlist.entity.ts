import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDataEntity } from './user.data.entity';

@Entity('playlist')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true, default: [] })
  musicIds: string[];

  @Column({ default: 0 })
  listenCount: number;

  @Column({ default: 0 })
  likes: number;

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
