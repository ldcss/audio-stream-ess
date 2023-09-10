/*
id          Int      @id @default(autoincrement())
  name        String
  description String
  createdAt   DateTime @default(now())
  artist      User     @relation(fields: [artistId], references: [id])
  artistId    Int
  released    Boolean
  music       Music[]
*/

import BaseEntity from "./base.entity";

class AlbumEntity extends BaseEntity{
  name: string;
  description: string;
  createdAt: Date;
  released: Boolean;
  artist: {name: string}
  artistId: Number;
  music: []

  constructor(data: AlbumEntity) {
    super(data.id || '');
    this.name = data.name;
    this.description = data.description;
    this.artistId = data.artistId;
    this.released = data.released;
    this.artistId = data.artistId;
    this.music = data.music
  }

}

export default AlbumEntity;