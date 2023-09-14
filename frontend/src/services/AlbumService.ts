import { AxiosResponse } from 'axios';
import api from './api';
import { Album } from '../types/albumTypes';

export class AlbumService {
  static async getAlbuns(): Promise<AxiosResponse<Album[]>> {
    const response = await api.get(`/album`, {validateStatus: (status) => [200].includes(status)});
    return response.data;
  }
  static async createAlbum(data:Partial<Album>): Promise<AxiosResponse<Album[]>> {
    const response = await api.post(`/album`, data);
    return response.data;
  }
}