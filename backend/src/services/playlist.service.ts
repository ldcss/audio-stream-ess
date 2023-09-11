import { Playlist } from '@prisma/client';
import PlaylistRepository from '../repositories/playlist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

export interface QueryParams {
  genre?: string;
  duration?: string;
}

class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  public playlistDuration(totalTime: number) {
    const min = Math.floor((totalTime / 1000 / 60) << 0);
    const seg = Math.floor((totalTime / 1000) % 60);
    const hr = Math.floor((totalTime / (1000 * 60 * 60)) % 24);
    return `${hr}:${min}:${seg}`;
  }

  public async getPlaylists(idUser?: number): Promise<Playlist[]> {
    const playlistsOfUser = await this.playlistRepository.getPlaylists(idUser);
    return playlistsOfUser;
  }

  public async getPlaylist(id: number): Promise<Playlist | null> {
    const playlist = await this.playlistRepository.getPlaylist(id);

    if (!playlist) {
      throw new HttpNotFoundError({
        msg: 'Playlist not found',
      });
    }

    return playlist;
  }

  public async getPlaylistsByFilter(idUser: number, queryParams: QueryParams) {
    return await this.playlistRepository.getPlaylistsByFilter(idUser, queryParams);
  }

  public async addMusicToPlaylist(idPlaylist: number, idMusica: number): Promise<Playlist | null> {
    return await this.playlistRepository.addMusicToPlaylist(idPlaylist, idMusica);
  }

  public async deleteMusicFromPlaylist(idPlaylist: number, idMusica: number): Promise<Playlist | null> {
    return await this.playlistRepository.deleteMusicFromPlaylist(idPlaylist, idMusica);
  }
  // public async createPlaylist(data: PlaylistEntity): Promise<PlaylistModel> {
  //   const playlistEntity = await this.playlistRepository.createPlaylist(data);
  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return playlistModel;
  // }

  // public async addMusictoPlaylist(id: string, data: Playlist) {
  //   const playlist = await this.playlistRepository.updatePlaylist(+id, data);

  //   if (!playlist) {
  //     throw new HttpNotFoundError({
  //       msg: 'Playlist not found',
  //       msgCode: '404 NOT FOUND',
  //     });
  //   }

  //   return playlist;
  // }

  // public async deletePlaylist(id: string): Promise<void> {
  //   await this.playlistRepository.deletePlaylist(id);
  // }
}

export default PlaylistService;
