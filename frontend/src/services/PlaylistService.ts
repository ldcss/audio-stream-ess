import { AxiosResponse } from 'axios';
import api from './api';
import { Playlist, PlaylistDto } from '../types/playlistTypes';

export class PlaylistService {
  static async getPlaylistsFromUser(): Promise<AxiosResponse<Playlist[]>> {
    const response = await api.get('/user/:id/playlist', {validateStatus: (status) => [200].includes(status)});
    return response;
  }
  static async getPlaylistsWithMusicsFromUser(idUser: number, genre?: string, duration?: number): Promise<AxiosResponse<PlaylistDto[]>> {
    const response = await api.get(`/user/${idUser}/playlist`, {params: {id: idUser, genre: genre, duration: duration}, validateStatus: (status => [200].includes(status))})
    return response;
  }
}