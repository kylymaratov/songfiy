import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { SessionSerializer } from './session/session.serailazer';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { UserDataEntity } from 'src/database/entities/user.data.entity';
import { UserInfoEntity } from 'src/database/entities/user.info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserDataEntity, UserInfoEntity]),
    PassportModule.register({ session: true }),
  ],
  providers: [UsersService, AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
