import AlbumEntity from './album.entity';
import BaseEntity from './base.entity';

export default class MusicEntity {
  id: number;
  name: string;
  description: string;
  duration: number;
  albumId: number;
  createdAt: Date | string;
  album?: any;

  constructor(data: MusicEntity) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.duration = data.duration;
    this.albumId = data.albumId;
    this.createdAt = data.createdAt
  }
}
