import { Module } from '@nestjs/common';
import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
//
import { AuthModule } from './modules/v1/auth/auth.module';
import { UserModule } from './modules/v1/user/user.module';
import { SongModule } from './modules/v1/song/song.module';
import { serverEnv } from './common/server/server.env';

@Module({
  imports: [
    IORedisModule.forRoot({ type: 'single', url: serverEnv.env.REDIS_URL }),
    AuthModule,
    UserModule,
    SongModule,
  ],
})
export class AppModule {}
