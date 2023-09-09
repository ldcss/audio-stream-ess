import { Music, Playlist } from '@prisma/client';

export default interface PlaylistModel extends Playlist {
  musics?: Music[];
  duration?: string;
}
