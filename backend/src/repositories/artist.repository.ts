import ArtistsEntity from '../entities/artist.entity';
import BaseRepository from './base.repository';
import { User, PrismaClient } from '@prisma/client';

class ArtistRepository extends BaseRepository<ArtistsEntity> {
  private db2: PrismaClient;

  constructor() {
    super('artist');
    this.db2 = new PrismaClient();
  }

  public async getArtists(): Promise<User[]> {
    const artists = await this.db2.user.findMany({
      where: { type: 1 },
    });
    return artists;
  }

  public async getArtist(id: string): Promise<User | null> {
    const artist: User | null = await this.db2.user.findUnique({
      where: {
        id: Number(id),
        type: 1,
      },
    });

    if (!artist) {
      throw new Error('Not found');
    }

    return artist;
  }

  public async createArtist(data: ArtistsEntity): Promise<ArtistsEntity> {
    return await this.add(data);
  }

  public async updateArtist(id: string, data: ArtistsEntity): Promise<ArtistsEntity | null> {
    return await this.update(item => item.id === id, data);
  }

  public async deleteArtist(id: string): Promise<void> {
    await this.delete(item => item.id !== id);
  }
}

export default ArtistRepository;
