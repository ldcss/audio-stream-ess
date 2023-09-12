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

  public async getPlaylist(idPlaylist: number, idUser: number): Promise<PlaylistModel | null> {
    const playlist = await this.db.playlist.findUnique({
      where: { id: idPlaylist, AND: { ownerId: idUser } },
      include: { music: { include: { music: true } }, owner: true },
    });
    if (!playlist) return null;
    const playlistModel: PlaylistModel = {
      id: playlist.id,
      createdAt: playlist.createdAt,
      description: playlist.description,
      duration: 0,
      genre: playlist.genre,
      name: playlist.name,
      ownerId: playlist.ownerId,
      updatedAt: playlist.updatedAt,
      musics: [],
      owner: playlist.owner,
    };
    const musics: Music[] = [];
    playlist.music.forEach(music => {
      musics.push(music.music);
      playlistModel.duration += music.music.duration.getTime();
    });
    return playlistModel;
  }

  public async getPlaylistById(id: number): Promise<Playlist | null> {
    const playlist = await this.db.playlist.findUnique({
      where: { id: id },
    });

    if (!playlist) {
      return null;
    }
    return playlist;
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

  public async addMusicToPlaylist(idPlaylist: number, idMusica: number): Promise<Playlist | null> {
    const result = await this.db.musicToPlaylist.create({
      data: {
        musicId: idMusica,
        playlistId: idPlaylist,
        createdAt: new Date(),
      },
    });

    if (!result) {
      throw new Error('resultado vazio');
    }
    const res = this.db.playlist.findUnique({ where: { id: idPlaylist } });
    if (!res) {
      throw new Error('playlist invalida');
    }

    return res;
  }

  public async deleteMusicFromPlaylist(
    idPlaylist: number,
    idMusica: number,
  ): Promise<Playlist | null> {
    const result = await this.db.musicToPlaylist.deleteMany({
      where: {
        playlistId: idPlaylist,
        musicId: idMusica,
      },
    });

    if (!result) {
      throw new Error('Música não encontrada na playlist.');
    }

    return null;
  }
}

export default PlaylistRepository;
