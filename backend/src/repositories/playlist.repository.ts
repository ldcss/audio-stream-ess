import { PrismaClient, Playlist, Music } from '@prisma/client';
import { QueryParams } from '../services/playlist.service';
import PlaylistModel from '../models/playlist.model';

class PlaylistRepository {
  private prefix = 'playlist';
  private db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  public async getPlaylists(idUser?: number): Promise<Playlist[]> {
    const playlists = await this.db.playlist.findMany({
      where: { ...(idUser !== undefined ? { ownerId: idUser } : {}) },
    });
    return playlists;
  }

  public async getPlaylistsByFilter(
    idUser: number,
    queryParams: QueryParams,
  ): Promise<PlaylistModel[]> {
    const playlistsEntity = await this.db.playlist.findMany({
      where: { ownerId: idUser, genre: queryParams.genre },
      select: { id: true },
    });
    const playlistIds = playlistsEntity.map(playlist => {
      return playlist.id;
    });
    const playlistsModel = await this.getPlaylistWithMusics(playlistIds);
    if (queryParams.duration) {
      return playlistsModel.filter(playlist => playlist.duration <= +queryParams.duration!);
    }
    return playlistsModel;
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    return await this.db.playlist.findUnique({ where: { id: id } });
  }

  //na tela das playlists
  public async getPlaylistWithMusics(playlistIds: number[]): Promise<PlaylistModel[]> {
    const playlist = await this.db.playlist.findMany({
      include: { music: { include: { music: true } } },
      where: { ...(playlistIds.length ? { id: { in: playlistIds } } : {}) },
    });
    const playlistWithMusic = playlist.map(playlist => {
      const musics: Music[] = [];
      let totalDuration = 0;
      playlist.music.forEach(music => {
        musics.push(music.music);
        totalDuration += music.music.duration.getTime();
      });
      return { ...playlist, music: musics, duration: totalDuration };
    });
    return playlistWithMusic;
    
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
  public async getPlaylistLikesDetails(
    playlistId: number,
  ): Promise<{ count: number; users: Array<{ id: number; name: string }> }> {
    const likes = await this.db.likes.findMany({
      where: { playlistId: playlistId },
      include: { user: true },
    });

    const usersWhoLiked = likes
      .map((like: { user: { id: number; name: string; email?: string } | null }) => {
        if (like.user) {
          return {
            id: like.user.id,
            name: like.user.name,
          };
        } else {
          return undefined;
        }
      })
      .filter(Boolean as unknown as (value: any) => value is { id: number; name: string });

    return {
      count: likes.length,
      users: usersWhoLiked as Array<{ id: number; name: string }>,
    };
  }

  public async getLikes(): Promise<any> {
    return this.db.likes.findMany();
  }


  public async removeLikeFromPlaylist(playlistId: number, userId: number): Promise<void> {
    await this.db.likes.delete({
      where: {
        userId_playlistId: {
          userId: userId,
          playlistId: playlistId,
        },
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
}

export default PlaylistRepository;
