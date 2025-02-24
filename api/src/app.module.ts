import { Module } from '@nestjs/common';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
//
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/user/user.module';
import { SongModule } from './modules/v1/song/song.module';
import { apiEnv } from './api/options/api.env';

@Module({
  imports: [
    IORedisModule.forRoot({ type: 'single', url: apiEnv.env.REDIS_URL }),
    AuthModule,
    UserModule,
    SongModule,
  ],
})
export class AppModule {}
