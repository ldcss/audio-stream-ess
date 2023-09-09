import { PrismaClient, Playlist, Music } from '@prisma/client/edge';
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
    // const tempoTotal = musics[0].duration.getTime();
    // const min = Math.floor((tempoTotal / 1000 / 60) << 0);
    // const seg = Math.floor((tempoTotal / 1000) % 60);
    // const hr = Math.floor((tempoTotal / (1000 * 60 * 60)) % 24);
    // console.log(musics[0].duration.getTime());
    // console.log(musics[1].duration.getTime());
    // console.log(musics[0].duration.getTime() + musics[1].duration.getTime());
    // console.log(`hr: ${hr}, min: ${min}, seg: ${seg}`);
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
