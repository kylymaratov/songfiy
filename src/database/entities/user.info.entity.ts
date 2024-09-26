import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'user-info' })
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true })
  about: string;

  @OneToOne(() => UserEntity, (user) => user.info)
  user: UserEntity;
}
