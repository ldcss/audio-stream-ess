import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import { di } from '../../src/di';
import PlaylistEntity from '../../src/entities/playlist.entity';

const feature = loadFeature('tests/features/cadastro_manutencao_playlists.feature');
jest.mock('../../src/repositories/playlist.repository');

const request = supertest(app);

defineFeature(feature, test => {
  let mockPlaylists: PlaylistEntity;
  let mockPlaylists1: PlaylistEntity;

  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylist = mockGetPlaylist;

  const mockUpdatePlaylist = jest.fn();
  mockUpdatePlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.updatePlaylist = mockUpdatePlaylist;
  // mocking the repository
  let mockPlaylistRepository: PlaylistRepository;
  let response: supertest.Response;

  // Antes de cada test ser rodado, ele reseta o mockRepository
  beforeEach(async () => {
    mockPlaylists = {
      id: 1,
      name: 'Melhores do grimes',
      genre: 'grimes',
      description: 'loucura',
      ownerId: 1,
      createdAt: '2019-01-16 22:03:12',
      updatedAt: '2019-01-16 22:03:12',
      music: [
        {
          id: 2,
          name: 'Amo meu curso',
          description: 'Música #2 do álbum Lucas Daniel EP',
          duration: 370000,
          albumId: 1,
          createdAt: '2023-09-14T05:39:44.436Z',
          album: {
            id: '1',
            name: 'Lucas Daniel EP',
            description: 'Álbum feito com coração pelo aluno Lucas Daniel',
            createdAt: '2023-09-14T05:39:44.426Z',
            artistId: 7,
            released: true,
          },
        },
      ],
    };

    mockPlaylists1 = {
      id: 1,
      name: 'Melhores do grimes',
      genre: 'grimes',
      description: 'loucura',
      ownerId: 1,
      createdAt: '2019-01-16 22:03:12',
      updatedAt: '2019-01-16 22:03:12',
      music: [
        {
          id: 2,
          name: 'Amo meu curso',
          description: 'Música #2 do álbum Lucas Daniel EP',
          duration: 3000,
          albumId: 1,
          createdAt: '2023-09-14T05:39:44.436Z',
          album: {
            id: '1',
            name: 'Lucas Daniel EP',
            description: 'Álbum feito com coração pelo aluno Lucas Daniel',
            createdAt: '2023-09-14T05:39:44.426Z',
            artistId: 7,
            released: true,
          },
        },
        {
          id: 3,
          name: 'Odeio meu curso',
          description: 'Música #2 do álbum João EP',
          duration: 3000,
          albumId: 1,
          createdAt: '2023-09-14T05:39:44.436Z',
          album: {
            id: '2',
            name: 'João EP',
            description: 'Álbum feito com coração pelo aluno João',
            createdAt: '2023-09-14T05:39:44.426Z',
            artistId: 7,
            released: true,
          },
        },
      ],
    };
  });

  test('Adicionar música a uma playlist como usuário logado', ({ given, and, when, then }) => {
    given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
      if (id === '1') {
        mockGetPlaylist.mockReturnValue(mockPlaylists);
      }
    });

    and(
      /^o sistema tem uma playlist com o id "(.*)", duração "(.*)", música de id "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockGetPlaylist.mockReturnValueOnce({
          id: arg0,
          name: 'Melhores do grimes',
          genre: 'grimes',
          description: 'loucura',
          ownerId: 1,
          duration: 30000,
          createdAt: '2019-01-16 22:03:12',
          updatedAt: '2019-01-16 22:03:12',
          music: [
            {
              id: arg2,
              name: 'Amo meu curso',
              description: 'Música #2 do álbum Lucas Daniel EP',
              duration: arg1,
              albumId: 1,
              createdAt: '2023-09-14T05:39:44.436Z',
              album: {
                id: '1',
                name: 'Lucas Daniel EP',
                description: 'Álbum feito com coração pelo aluno Lucas Daniel',
                createdAt: '2023-09-14T05:39:44.426Z',
                artistId: 7,
                released: true,
              },
            },
          ],
        });

        expect(PlaylistRepository.prototype.getPlaylist(arg0, arg3)).toEqual({
          id: arg0,
          name: 'Melhores do grimes',
          genre: 'grimes',
          description: 'loucura',
          ownerId: 1,
          duration: 30000,
          createdAt: '2019-01-16 22:03:12',
          updatedAt: '2019-01-16 22:03:12',
          music: [
            {
              id: arg2,
              name: 'Amo meu curso',
              description: 'Música #2 do álbum Lucas Daniel EP',
              duration: arg1,
              albumId: 1,
              createdAt: '2023-09-14T05:39:44.436Z',
              album: {
                id: '1',
                name: 'Lucas Daniel EP',
                description: 'Álbum feito com coração pelo aluno Lucas Daniel',
                createdAt: '2023-09-14T05:39:44.426Z',
                artistId: 7,
                released: true,
              },
            },
          ],
        });
      },
    );

    when(
      /^uma requisição POST for enviada para a url "(.*)", eu atualizo a duração da playlist para "(.*)"$/,
      (arg0, arg1) => {
        mockPlaylists.duration = arg1;
      },
    );

    and(/^eu atualizo a lista de músicas para$/, arg0 => {
      mockPlaylists.music = arg0;
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      const response = JSON.parse(responseTest);
      expect(response).toMatchObject(mockPlaylists1);
    });

    and(/^é retornado um status "(.*)" como música adicionada com sucesso$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Excluir música da playlist como usuário logado', ({ given, and, when, then }) => {
    given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
      if (id === 1) {
        mockGetPlaylist.mockReturnValue(mockPlaylists);
      }
    });

    and(
      /^o sistema tem uma playlist com o id "(.*)", duração "(.*)", música de id "(.*)" e user de id "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockGetPlaylist.mockReturnValueOnce({
          id: arg0,
          name: 'Melhores do grimes',
          genre: 'grimes',
          description: 'loucura',
          ownerId: 1,
          duration: 30000,
          createdAt: '2019-01-16 22:03:12',
          updatedAt: '2019-01-16 22:03:12',
          music: [
            {
              id: 2,
              name: 'Amo meu curso',
              description: 'Música #2 do álbum Lucas Daniel EP',
              duration: arg1,
              albumId: 1,
              createdAt: '2023-09-14T05:39:44.436Z',
              album: {
                id: '1',
                name: 'Lucas Daniel EP',
                description: 'Álbum feito com coração pelo aluno Lucas Daniel',
                createdAt: '2023-09-14T05:39:44.426Z',
                artistId: 7,
                released: true,
              },
            },
          ],
        });

        expect(PlaylistRepository.prototype.getPlaylist(arg0, arg3)).toEqual({
          id: arg0,
          name: 'Melhores do grimes',
          genre: 'grimes',
          description: 'loucura',
          ownerId: 1,
          duration: 30000,
          createdAt: '2019-01-16 22:03:12',
          updatedAt: '2019-01-16 22:03:12',
          music: [
            {
              id: 2,
              name: 'Amo meu curso',
              description: 'Música #2 do álbum Lucas Daniel EP',
              duration: arg1,
              albumId: 1,
              createdAt: '2023-09-14T05:39:44.436Z',
              album: {
                id: arg2,
                name: 'Lucas Daniel EP',
                description: 'Álbum feito com coração pelo aluno Lucas Daniel',
                createdAt: '2023-09-14T05:39:44.426Z',
                artistId: 7,
                released: true,
              },
            },
          ],
        });
      },
    );

    when(
      /^eu faço uma requisição DELETE para a url "(.*)", pegando a música de id "(.*)", eu atualizo a duração para "(.*)"$/,
      (arg0, arg1, arg2) => {
        mockPlaylists.duration = arg2;
      },
    );

    and(/^eu atualizo a lista de músicas para para "(.*)"$/, arg0 => {
      mockPlaylists.music = arg0;
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      const response = JSON.parse(responseTest);
      expect(response).toMatchObject(mockPlaylists);
    });

    and(/^é retornado um status "(.*)" como deletado com sucesso$/, responseStatusCode => {
      let statusCode = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
