import { Music } from "./musicTypes"

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
}