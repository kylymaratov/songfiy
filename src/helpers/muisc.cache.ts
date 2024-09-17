import { Injectable } from '@nestjs/common';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MusicCache {
  private maxCacheSize: number = 100;
  async cleanOldCache(musicCacheRepository: Repository<MusicCacheEntity>) {
    try {
      const totalCacheSize = await musicCacheRepository
        .createQueryBuilder('cache')
        .getCount();

      if (totalCacheSize > this.maxCacheSize) {
        const oldCacheIds = await musicCacheRepository
          .createQueryBuilder('cache')
          .select('cache.id')
          .orderBy('cache.lastAccessed', 'ASC')
          .limit(totalCacheSize - this.maxCacheSize)
          .getMany();

        if (oldCacheIds.length > 0) {
          await musicCacheRepository
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
}
