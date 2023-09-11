import AlbumRepository from "../repositories/album.repository";
import { Album } from '@prisma/client';


class AlbumService{
  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  public async getAlbunsService(): Promise<Album[]>{
    return await this.albumRepository.getAlbuns();
  }

  public async getAlbum(id: string): Promise<Album>{
    return this.albumRepository.getAlbum(id);
  }

  public async createAlbum(data: Album) {
    return this.albumRepository.createAlbum(data)
  }

  public async updateAlbum(id:string, data: Album) {
    return this.albumRepository.updateAlbum(id, data)
  }

  public async deleteAlbum(id:string) {
    return this.albumRepository.deleteAlbum(id)
  }
}

export default AlbumService;