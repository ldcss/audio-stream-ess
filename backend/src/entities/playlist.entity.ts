import MusicEntity from './music.entity';
export default class PlaylistEntity {
  id: number;
  name: string;
  genre: string;
  description: string;
  ownerId: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  duration?: any;
  music?: MusicEntity[];

  constructor(data: PlaylistEntity) {
    this.id = data.id;
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.ownerId = data.ownerId;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
