import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './modules/music/music.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpLoggerMiddleware } from './middlewares/http.middleware';
import { CronModule } from './cron/cron.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from './database/database.provider';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    MusicModule,
    UsersModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
