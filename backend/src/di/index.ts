import AlbumRepository from '../repositories/album.repository';
import ArtistRepository from '../repositories/artist.repository';
import MusicRepository from '../repositories/music.repository';
import OtherRepository from '../repositories/other.repository';
import PlaylistRepository from '../repositories/playlist.repository';
import TestRepository from '../repositories/test.repository';
import AlbumService from '../services/album.service';
import ArtistService from '../services/artist.service';
import MusicService from '../services/music.service';
import PlaylistService from '../services/playlist.service';
import TestService from '../services/test.service';
import Injector from './injector';

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerService(
  TestService,
  new TestService(di.getRepository(TestRepository), di.getRepository(OtherRepository)),
);
di.registerRepository(PlaylistRepository, new PlaylistRepository());
di.registerRepository(AlbumRepository, new AlbumRepository());
di.registerRepository(ArtistRepository, new ArtistRepository());
di.registerRepository(MusicRepository, new MusicRepository());
di.registerService(PlaylistService, new PlaylistService(di.getRepository(PlaylistRepository)));
di.registerService(AlbumService, new AlbumService(di.getRepository(AlbumRepository)));
di.registerService(ArtistService, new ArtistService(di.getRepository(ArtistRepository)));
di.registerService(MusicService, new MusicService(di.getRepository(MusicRepository)))
