import MusicEntity from '../entities/music.entity';
import { PrismaClient, Music } from '@prisma/client';

class MusicRepository {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getMusics(): Promise<Music[] | null> {
    const music = await this.db.music.findMany();
    return music;
  }

}

export default MusicRepository;
