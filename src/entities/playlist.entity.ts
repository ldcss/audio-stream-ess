import BaseEntity from "./base.entity";

type IUser = {
  name : string
}


export default class PlaylistEntity extends BaseEntity {
  name: string;
  genre: string;
  description: string;
  idUser: number;
  likes?: IUser[];
  createdBy?: string; 

  constructor(data: PlaylistEntity) {
    super(data.id || "");
    this.name = data.name;
    this.genre = data.genre;
    this.description = data.description;
    this.idUser = data.idUser;
    this.likes = data.likes;
    this.createdBy = data.createdBy; 
  }
}
