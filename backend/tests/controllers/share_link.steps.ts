import { defineFeature, loadFeature } from 'jest-cucumber';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import { Music } from '@prisma/client';

const feature = loadFeature('tests/features/gerar_link_de_playlist.feature');

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

  test('Criar link de compartilhamento de playlists', ({ given, when, then, and }) => {
    given(/^que eu sou o usuário com id "(.*)"$/, async id => {
      //Checagem de login
      if (id === '0') mockGetPlaylist.mockReturnValue(mockPlaylists[0]);
    });

    and('eu estou na página da playlist', async playlist => {
      // get mockado
      const obj = JSON.parse(playlist);
      expect(mockGetPlaylist()).toMatchObject(obj);
    });

    when('eu clicar no ícone de compartilhamento da playlist', url => {
      //url.idUser = 0 e url.id = 1
      const parsed = JSON.parse(url);

      expect('/api/user/' + parsed.ownerId + `/playlist/${parsed.id}/`).toBe(
        '/api/user/0/playlist/1/',
      );
    });

    then(/^a url da playlist melhores do grime será "(.*)"$/, copyUrl => {
      expect(copyUrl).toBe('/api/user/0/playlist/1');
    });
  });
});
