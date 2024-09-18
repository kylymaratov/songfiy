import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicEntity } from 'src/database/entities/music.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicCacher {
  private maxCacheSize: number = 100;

  constructor(
    @InjectRepository(MusicCacheEntity)
    private musicCacheRepository: Repository<MusicCacheEntity>,
  ) {}

  async cleanOldCache() {
    try {
      const totalCacheSize = await this.musicCacheRepository
        .createQueryBuilder('cache')
        .getCount();

      if (totalCacheSize > this.maxCacheSize) {
        const oldCacheIds = await this.musicCacheRepository
          .createQueryBuilder('cache')
          .select('cache.id')
          .orderBy('cache.lastAccessed', 'ASC')
          .limit(totalCacheSize - this.maxCacheSize)
          .getMany();

        if (oldCacheIds.length > 0) {
          await this.musicCacheRepository
            .createQueryBuilder()
            .delete()
            .from(MusicCacheEntity)
            .whereInIds(oldCacheIds.map((cache) => cache.id))
            .execute();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveToCache(buffer: Buffer, music: MusicEntity) {
    const newCache = this.musicCacheRepository.create({ buffer, music });

    await this.musicCacheRepository.save(newCache);
  }
}
