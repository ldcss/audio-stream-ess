import { Music } from "./musicTypes"
import { User } from "./userTypes"

export interface Playlist{
  id: number
  name: string
  genre: string
  description: string
  ownerId: number
  createdAt: Date
  updatedAt: Date
}

export interface PlaylistDto extends Playlist {
  musics: Music[];
  duration: number;
  owner?: User;
}

export type PlaylistLikesDetail = {
  count: number;
  users: Array<{ id: number; name: string }>;
};

