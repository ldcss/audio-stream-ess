import { AxiosResponse } from 'axios';
import api from './api';
import { Playlist, PlaylistDto, PlaylistLikesDetail } from '../types/playlistTypes';

export class PlaylistService {
  static async getPlaylistsFromUser(id: number): Promise<AxiosResponse<Playlist[]>> {
    const response = await api.get(`/user/${id}/playlist`, {validateStatus: (status) => [200].includes(status)});
    console.log('response do get', response);
    return response.data;
  }
  static async getPlaylistsWithMusicsFromUser(idUser: number, genre?: string, duration?: number): Promise<AxiosResponse<PlaylistDto[]>> {
    const response = await api.get(`/user/${idUser}/playlist`, {params: {id: idUser, genre: genre, duration: duration}, validateStatus: (status => [200].includes(status))})
    return response.data;
  }
  static async getAllPlaylistsWithMusics(genre?: string, duration?: number): Promise<AxiosResponse<PlaylistDto[]>> {
    const response = await api.get(`/playlist`, {params: {genre: genre, duration: duration}, validateStatus: (status => [200].includes(status))})
    return response.data;
  }
  static async getPlaylistFromUser(idUser: number, idPlaylist: number): Promise<AxiosResponse<PlaylistDto>> {
    const response = await api.get(`/user/${idUser}/playlist/${idPlaylist}`, {validateStatus: (status => [200].includes(status))});
    return response.data;
  }
  static async addLikeToPlaylist(playlistId: number, userId: number): Promise<AxiosResponse<void>> {
    const response = await api.post(`/playlist/${playlistId}/likes/${userId}`, {validateStatus: (status: number) => [200, 201].includes(status)});
    return response;
  }
  static async removeLikeFromPlaylist(playlistId: number, userId: number): Promise<AxiosResponse<void>> {
    const response = await api.delete(`/playlist/${playlistId}/likes/${userId}`, {
        validateStatus: (status: number) => [200, 201, 204].includes(status)
    });
    return response;
}
  static async getPlaylistLikesDetails(playlistId: number): Promise<AxiosResponse<PlaylistLikesDetail>> {
    const response = await api.get(`/playlist/${playlistId}/likes`, {
        validateStatus: (status: number) => [200].includes(status)
    });
    return response;
  }
  static async getPlaylistById(idPlaylist: number): Promise<AxiosResponse<PlaylistDto>> {
    const response = await api.get(`/playlist/${idPlaylist}`, {validateStatus: (status => [200].includes(status))});
    return response.data;
  }



}