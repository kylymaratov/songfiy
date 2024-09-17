import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'aritsts' })
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
