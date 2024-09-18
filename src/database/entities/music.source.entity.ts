import { Message } from 'telegraf/typings/core/types/typegram';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from './music.entity';

@Entity({ name: 'music-source' })
export class MusicSourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'telegram' })
  sourceName: 'telegram';

  @Column()
  status: 'saved' | 'downloading' | 'downloaded';

  @Column({ type: 'json', nullable: true })
  mediaData: Message.AudioMessage | null;

  @OneToOne(() => MusicEntity, (music) => music.source)
  music: MusicEntity;
}
