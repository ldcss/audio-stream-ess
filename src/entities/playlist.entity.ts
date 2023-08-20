import BaseEntity from "./base.entity";

export default class PlaylistEntity extends BaseEntity {
  name: string;
  genre: string;
  description: string;
  idUser: number;

  constructor(data: PlaylistEntity) {
    super(data.id || "");
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.idUser = data.idUser;
  }
}
