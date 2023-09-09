import { Playlist } from '@prisma/client';
import PlaylistRepository from '../repositories/playlist.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';
import PlaylistModel from '../models/playlist.model';

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

  public async getPlaylists(idUser?: number): Promise<PlaylistModel[]> {
    const playlistEntity = await this.playlistRepository.getPlaylists(idUser);
    const playlistModel = playlistEntity.map(async playlist => {
      const playlistMusics = await this.playlistRepository.getPlaylistMusics(playlist.id);
      const duration = 0;
      return playlistMusics;
    });
    return playlistEntity;
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
    // console.log('queryParams service', queryParams);
    return await this.playlistRepository.getPlaylistsByFilter(idUser, queryParams);
  }

  // public async createPlaylist(data: PlaylistEntity): Promise<PlaylistModel> {
  //   const playlistEntity = await this.playlistRepository.createPlaylist(data);
  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return playlistModel;
  // }

  // public async updatePlaylist(id: string, data: PlaylistEntity): Promise<PlaylistModel> {
  //   const playlistEntity = await this.playlistRepository.updatePlaylist(id, data);

  //   if (!playlistEntity) {
  //     throw new HttpNotFoundError({
  //       msg: 'Playlist not found',
  //       msgCode: PlaylistServiceMessageCode.playlist_not_found,
  //     });
  //   }

  //   const playlistModel = new PlaylistModel(playlistEntity);

  //   return playlistModel;
  // }

  // public async deletePlaylist(id: string): Promise<void> {
  //   await this.playlistRepository.deletePlaylist(id);
  // }
}

export default PlaylistService;
