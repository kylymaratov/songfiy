import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { MusicSearcher, TMusic } from 'src/helpers/music.searcher';
import { SearchMusicDto } from './dto/search-music.dto';
import { EntityManager, Repository } from 'typeorm';
import { MusicEntity } from 'src/database/entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicDownloader } from 'src/helpers/music.downloder';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { MusicCache } from 'src/helpers/muisc.cache';

@Injectable()
export class MusicService {
  private musicSearcher: MusicSearcher = new MusicSearcher();
  private musicDownloder: MusicDownloader = new MusicDownloader();
  private musicCache: MusicCache = new MusicCache();

  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
    @InjectRepository(MusicCacheEntity)
    private readonly musicCacheRepository: Repository<MusicCacheEntity>,
    @InjectRepository(MusicSourceEntity)
    private readonly musicSourceRepository: Repository<MusicSourceEntity>,
  ) {}

  private async saveMusic(musics: TMusic[]) {
    try {
      await this.musicRepository.manager.transaction(
        async (transactionalEntityManager: EntityManager) => {
          for (const music of musics) {
            const existingMusic = await transactionalEntityManager.findOne(
              MusicEntity,
              {
                where: { musicId: music.musicId },
              },
            );
            if (existingMusic) continue;

            const newMusicSource = this.musicSourceRepository.create({
              status: 'saved',
            });

            const newMusic = this.musicRepository.create({
              ...music,
              musicSource: newMusicSource,
            });

            const savedMusic = await transactionalEntityManager.save(
              MusicEntity,
              newMusic,
            );

            newMusicSource.music = savedMusic;

            await transactionalEntityManager.save(
              MusicSourceEntity,
              newMusicSource,
            );
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async searchMusic(body: SearchMusicDto): Promise<TMusic[]> {
    const { query, limit } = body;

    const musicReponse = await this.musicSearcher.searchMusic(query, limit);

    this.saveMusic(musicReponse);

    return musicReponse;
  }

  async listenMusic(
    musicId: string,
  ): Promise<{ music: MusicEntity; buffer: Buffer }> {
    const music = await this.musicRepository.findOne({
      where: { musicId },
      relations: ['musicSource', 'cache'],
    });

    if (!music) throw new NotFoundException();

    this.musicCache.cleanOldCache(this.musicCacheRepository);

    if (music.musicSource?.status === 'downloading') throw new GoneException();

    if (music.cache) {
      await this.musicCacheRepository
        .createQueryBuilder()
        .update(MusicCacheEntity)
        .set({ lastAccessed: () => 'NOW()' })
        .where('id = :id', { id: music.cache.id })
        .execute();

      return { music, buffer: music.cache.buffer };
    }

    if (music.musicSource?.status === 'downloaded') {
      const buffer = await this.musicDownloder.getMusicFromTelegram(
        music?.musicSource,
      );

      if (!music.cache) {
        const newCache = this.musicCacheRepository.create({ buffer, music });

        await this.musicCacheRepository.save(newCache);
      }

      return { music, buffer };
    }

    const { buffer } = await this.musicDownloder.uploadMusicToTelegram(
      music,
      this.musicSourceRepository,
    );

    const newCache = this.musicCacheRepository.create({ buffer, music });

    await this.musicCacheRepository.save(newCache);

    return { music, buffer };
  }

  async getMusicById(musicId: string) {
    const music = await this.musicRepository.findOne({
      where: { musicId },
      relations: ['musicSource'],
    });

    return music;
  }
}
