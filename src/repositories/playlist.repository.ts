import { PrismaClient } from '@prisma/client';
import PlaylistEntity from '../entities/playlist.entity';

class PlaylistRepository {
  private prefix = 'playlist';
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getPlaylists(): Promise<PlaylistEntity[]> {
    return await this.db.playlist.findMany();
  }

  public async getPlaylist(id: number): Promise<PlaylistEntity | null> {
    return await this.db.playlist.findUnique({ where: { id: id } });
  }

  public async createPlaylist(data: PlaylistEntity): Promise<PlaylistEntity> {
    return await this.db.playlist.create({ data });
  }

  public async updatePlaylist(id: number, data: PlaylistEntity): Promise<PlaylistEntity | null> {
    return await this.db.playlist.update({ where: { id: id }, data });
  }

  public async deletePlaylist(id: number): Promise<void> {
    await this.db.playlist.delete({ where: { id: id } });
  }
}

export default PlaylistRepository;
