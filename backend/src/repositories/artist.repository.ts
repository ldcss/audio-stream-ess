import ArtistsEntity from '../entities/artist.entity';
import { User, PrismaClient } from '@prisma/client';

class ArtistRepository {
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getArtists(): Promise<User[]> {
    const artists = await this.db.user.findMany({
      where: { type: 1 },
    });
    return artists;
  }

  public async getArtist(id: number): Promise<User | null> {
    const artist: User | null = await this.db.user.findUnique({
      where: {
        id: id,
        type: 1,
      },
    });

    if (!artist) {
      throw new Error('Not found');
    }

    return artist;
  }
  public async createArtist(data: ArtistsEntity) {
    const artist: any = { ...data };
    return this.db.user.create({ data: { ...artist } });
  }

  public async updateArtist(id: number, data: ArtistsEntity): Promise<ArtistsEntity | null> {
    return await this.db.user.update({
      where: { id: id },
      data: data,
    });
  }

  public async deleteArtist(id: number): Promise<void> {
    await this.db.user.delete({ where: { id: id } });
  }
}

export default ArtistRepository;
