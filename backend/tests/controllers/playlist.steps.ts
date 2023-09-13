import { loadFeature, defineFeature } from 'jest-cucumber';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistModel from '../../src/models/playlist.model';
import { Music } from '@prisma/client';

const feature = loadFeature('tests/features/criar_categorias_playlists.feature');

jest.mock('../../src/repositories/playlist.repository');

interface PlaylistTestModel {
  id: number;
  name: string;
  genre: string;
  description: string;
  ownerId: number;
  musics?: Music[];
  duration: number;
}

defineFeature(feature, test => {
  let mockPlaylists: PlaylistTestModel[];

  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockGetPlaylist;

  beforeEach(async () => {
    mockPlaylists = [
      {
        id: 1,
        name: 'melhores do grime',
        genre: 'grime',
        description: '',
        ownerId: 0,
        duration: 1800000,
      },
      {
        id: 2,
        name: 'melhores do mpb',
        genre: 'mpb',
        description: '',
        ownerId: 0,
        duration: 3600000,
      },
      {
        id: 3,
        name: 'UK Drill',
        genre: 'drill',
        description: '',
        ownerId: 0,
        duration: 7200000,
      },
    ];
  });

  test('Playlist sem categoria', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      if (id === '0') mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      if (url) {
        const response = mockGetPlaylist(); //playlists do user com id 0
        expect(response).toEqual([
          {
            id: 1,
            name: 'melhores do grime',
            genre: 'grime',
            description: '',
            ownerId: 0,
            duration: 1800000,
          },
          {
            id: 2,
            name: 'melhores do mpb',
            genre: 'mpb',
            description: '',
            ownerId: 0,
            duration: 3600000,
          },
          {
            id: 3,
            name: 'UK Drill',
            genre: 'drill',
            description: '',
            ownerId: 0,
            duration: 7200000,
          },
        ]);
      }
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      const response = JSON.parse(responseTest);
      expect(mockGetPlaylist()).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por gênero', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?')[1].split('=');
      expect(filter[1]).toBe('mpb');
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter((playlist: PlaylistModel) => playlist.genre === 'mpb');
      const response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por duração', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?')[1].split('=');
      expect(filter[0]).toBe('duration');
      expect(filter[1]).toBe('1800000');
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter((playlist: PlaylistTestModel) => playlist.duration! <= 1800000);
      const response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por gênero e duração', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?');
      const genreFilter = filter[1].split('='); //genre=drill
      const durationFilter = parseInt(filter[2].split('=')[1], 10); //duration=120
      expect(genreFilter[1]).toBe('drill');
      expect(durationFilter).toBe(7200000);
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter(
        (playlist: PlaylistTestModel) =>
          playlist.duration! <= 7200000 && playlist.genre === 'drill',
      );
      const response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Usuários sem playlist', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      if (id === '0') mockGetPlaylist.mockReturnValue([]);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      if (url) {
        const response = mockGetPlaylist();
        expect(response).toEqual([]);
      }
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      const playlists = mockGetPlaylist();
      const response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
