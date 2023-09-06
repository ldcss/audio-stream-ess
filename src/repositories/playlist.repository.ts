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

  public async getPlaylistLikesDetails(
    playlistId: number,
  ): Promise<{ count: number; users: Array<{ id: number; name: string }> }> {
    const likes = await this.db.likes.findMany({
      where: { playlistId: playlistId },
      include: { user: true },
    });

    const usersWhoLiked = likes.map((like: { user: { id: number; name: string } }) => ({
      id: like.user?.id,
      name: like.user?.name,
    }));

    return {
      count: likes.length,
      users: usersWhoLiked,
    };
  }
  public async removeLikeFromPlaylist(playlistId: number, userId: number): Promise<void> {
    await this.db.likes.delete({
      where: {
        playlistId: playlistId,
        userId: userId,
      },
    });
  }
  public async addLikeToPlaylist(playlistId: number, userId: number): Promise<void> {
    await this.db.likes.create({
      data: {
        playlistId: playlistId,
        userId: userId,
      },
    });
  }
}

export default PlaylistRepository;
