import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { UserEntity } from './entities/user.entity';
import { MusicEntity } from './entities/music.entity';
import { ArtistEntity } from './entities/artist.entity';
import { MusicSourceEntity } from './entities/music.source.entity';
import { MusicCacheEntity } from './entities/music.cache.entity';

config();

const env = process.env;

export const databaseProvider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: true,
    entities: [
      UserEntity,
      MusicEntity,
      MusicSourceEntity,
      ArtistEntity,
      MusicCacheEntity,
    ],
  }),
];
