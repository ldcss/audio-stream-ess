import { User } from '@prisma/client';
import BaseModel from './base.model';

export default class ArtistModel extends BaseModel {
  name: string;
  genre: string;
  description: string;
  email: string;
  pass: string;

  constructor(data: User) {
    super('');
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.email = data.email;
    this.pass = data.password;
  }
}
