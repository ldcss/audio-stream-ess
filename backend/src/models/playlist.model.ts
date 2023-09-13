import { Music, Playlist, User } from '@prisma/client';

export default interface PlaylistModel extends Playlist {
  musics?: Music[];
  duration: number; //milisec
  owner?: User;
}
