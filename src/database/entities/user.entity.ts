import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDataEntity } from './user.data.entity';
import { UserInfoEntity } from './user.info.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  verfifed: boolean;

  @JoinColumn()
  @OneToOne(() => UserDataEntity, (userData) => userData.user, {
    cascade: true,
    nullable: false,
  })
  data: UserDataEntity;

  @JoinColumn()
  @OneToOne(() => UserInfoEntity, (info) => info.user, {
    cascade: true,
    nullable: false,
  })
  info: UserInfoEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
