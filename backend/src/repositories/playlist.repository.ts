import { PrismaClient, Playlist, Prisma, Music } from '@prisma/client';
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

  public async getPlaylistsByFilter(idUser: number, queryParams: QueryParams): Promise<Playlist[]> {
    const playlists = await this.db.playlist.findMany({
      where: { ownerId: idUser, genre: queryParams.genre },
    });
    // console.log('playlist get', await this.getPlaylistMusics(playlists[1].id));
    return playlists;
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    return await this.db.playlist.findUnique({ where: { id: id } });
  }

  public async getPlaylistMusics(playlistId?: number): Promise<PlaylistModel[]> {
    // return await this.db.$queryRaw<Music[]>(
    //   eslint-disable-next-line max-len
    //   Prisma.sql`SELECT * FROM "Music" mu INNER JOIN "MusicToPlaylist" mp ON mu.id = mp."musicId" WHERE mp."playlistId" = ${playlistId};`,
    // );
    const playlist = await this.db.playlist.findMany({
      include: { music: { include: { music: true } } },
      where: { ...(playlistId !== undefined ? { id: playlistId } : {}) },
    });
    const playlistWithMusic = playlist.map(playlist => {
      const musics: Music[] = [];
      playlist.music.forEach(music => {
        // console.log(`playlist.music[${i}].music`, music.music);
        musics.push(music.music);
      });
      return { ...playlist, music: musics };
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
