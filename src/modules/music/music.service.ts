import {
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MusicSearcher, TMusic } from 'src/modules/music/utils/music.searcher';
import { SearchMusicDto } from './dto/search.music.dto';
import { EntityManager, Repository } from 'typeorm';
import { MusicEntity } from 'src/database/entities/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramStorage } from 'src/storage/telegram.storage';
import { MusicCacheEntity } from 'src/database/entities/music.cache.entity';
import { MusicSourceEntity } from 'src/database/entities/music.source.entity';
import { MusicCacher } from 'src/modules/music/utils/music-cacher';
import { MusicStatEntity } from 'src/database/entities/music.stat.entity';
import { ServerLogger } from 'src/server/server.logger';

@Injectable()
export class MusicService {
  private logger: ServerLogger = new ServerLogger();

  constructor(
    @InjectRepository(MusicEntity)
    private readonly musicRepository: Repository<MusicEntity>,
    @InjectRepository(MusicCacheEntity)
    private readonly musicCacheRepository: Repository<MusicCacheEntity>,
    @InjectRepository(MusicSourceEntity)
    private readonly musicSourceRepository: Repository<MusicSourceEntity>,
    @InjectRepository(MusicStatEntity)
    private readonly musicStatRepository: Repository<MusicStatEntity>,

    @Inject() private musicCacher: MusicCacher,
    @Inject() private musicSearcher: MusicSearcher,
    @Inject() private telegramStorage: TelegramStorage,
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

            const newMusicStat = this.musicStatRepository.create({});

            const newMusic = this.musicRepository.create({
              ...music,
              source: newMusicSource,
              stat: newMusicStat,
            });

            const savedMusic = await transactionalEntityManager.save(
              MusicEntity,
              newMusic,
            );
          }
        },
      );
    } catch (error) {
      this.logger.error(error);
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
      relations: ['source', 'cache', 'stat'],
    });

    if (!music) throw new NotFoundException();

    await this.musicStatRepository.save({
      id: music.stat.id,
      listenCount: music.stat.listenCount + 1,
    });

    this.musicCacher.cleanOldCache();

    if (music.source?.status === 'downloading') throw new GoneException();

    if (music.cache) {
      await this.musicCacheRepository
        .createQueryBuilder()
        .update(MusicCacheEntity)
        .set({ lastAccessed: () => 'NOW()' })
        .where('id = :id', { id: music.cache.id })
        .execute();

      return { music, buffer: music.cache.buffer };
    }

    if (music.source?.status === 'downloaded') {
      const buffer = await this.telegramStorage.getMusic(music?.source);

      if (!music.cache) await this.musicCacher.saveToCache(buffer, music);

      return { music, buffer };
    }

    const { buffer } = await this.telegramStorage.uploadMusic(music);

    await this.musicCacher.saveToCache(buffer, music);

    return { music, buffer };
  }

  async getMusicById(musicId: string) {
    const music = await this.musicRepository.findOne({
      where: { musicId },
      relations: ['source'],
    });

    if (!music) throw new NotFoundException();

    return music;
  }

  async getTopMusic(limit: number = 10): Promise<MusicEntity[]> {
    const musics = await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.stat', 'stat')
      .orderBy('stat.likes', 'DESC')
      .take(limit)
      .getMany();

    return musics;
  }

  async getMostPlayedMusic(limit: number = 10): Promise<MusicEntity[]> {
    const musics = await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.stat', 'stat')
      .orderBy('stat.listenCount', 'DESC')
      .take(limit)
      .getMany();

    return musics;
  }

  async getRandomMusic(limit: number = 10) {
    const musics = await this.musicRepository
      .createQueryBuilder('music')
      .orderBy('RANDOM()')
      .take(limit)
      .getMany();

    return musics;
  }
}
