import BaseEntity from './base.entity';

export default class ArtistEntity {
  name: string;
  genre: string;
  description: string;
  email: string;
  password: string;
  type: number;
  id: number;

  constructor(data: ArtistEntity) {
    this.id = data.id;
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.email = data.email;
    this.password = data.password;
    this.type = 1;
  }
}
