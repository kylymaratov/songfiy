import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Module({
  imports: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
