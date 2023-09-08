import { PrismaClient, Playlist, Prisma, Music } from '@prisma/client';
import { QueryParams } from '../services/playlist.service';

class PlaylistRepository {
  private prefix = 'playlist';
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getPlaylists(idUser?: number): Promise<Playlist[]> {
    return await this.db.playlist.findMany({
      where: { ...(idUser !== undefined ? { ownerId: idUser } : {}) },
    });
  }

  public async getPlaylistsByFilter(idUser: number, queryParams: QueryParams): Promise<Playlist[]> {
    const playlists = await this.db.playlist.findMany({
      where: { ownerId: idUser, genre: queryParams.genre },
    });
    return playlists;
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    return await this.db.playlist.findUnique({ where: { id: id } });
  }

  public async getPlaylistMusics(id: number): Promise<Music[]> {
    return await this.db.$queryRaw<Music[]>(
      // eslint-disable-next-line max-len
      Prisma.sql`SELECT * FROM "Music" mu INNER JOIN "MusicToPlaylist" mp ON mu.id = mp."musicId" WHERE mp."playlistId" = ${id};`,
    );
  }

  public async createPlaylist(data: Playlist): Promise<Playlist> {
    return await this.db.playlist.create({ data });
  }

  public async updatePlaylist(id: number, data: Playlist): Promise<Playlist | null> {
    return await this.db.playlist.update({ where: { id: id }, data });
  }

  public async deletePlaylist(id: number): Promise<void> {
    await this.db.playlist.delete({ where: { id: id } });
  }
}

export default PlaylistRepository;
