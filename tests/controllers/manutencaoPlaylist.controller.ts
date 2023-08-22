import { loadFeature, defineFeature } from "jest-cucumber"
import supertest from "supertest";
import app from "../../src/app"
import PlaylistRepository from "../../src/repositories/playlist.repository";
import { di } from "../../src/di"
import PlaylistEntity from "../../src/entities/playlist.entity";

jest.mock("../../src/repositories/playlist.repository");
const feature = loadFeature('tests/features/cadastro_manutencao_playlist.feature')
const request = supertest(app)

defineFeature(feature, (test) => {

  let mockPlaylists: PlaylistEntity[];
  
  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockGetPlaylist; 

  const mockUpdatePlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockUpdatePlaylist;
  // mocking the repository
  let mockPlaylistRepository: PlaylistRepository;
  let response: supertest.Response;

  // Antes de cada test ser rodado, ele reseta o mockRepository
  beforeEach(async () => {
    mockPlaylists = [{
      id: "1",
      name: "melhores do grime",
      genre: "grime",
      description: "",
      idUser: 0,
      duration: 25,
      qtdMusicas: 3,
      id_musica: [1,2,3]
    }, {
      id: "2",
      name: "melhores do mpb",
      genre: "mpb",
      description: "",
      idUser: 0,
      duration: 50,
      qtdMusicas: 3,
      id_musica: [4,5,6]
    }, {
      id: "3",
      name: "UK Drill",
      genre: "drill",
      description: "",
      idUser: 0,
      duration: 120,
      qtdMusicas: 3,
      id_musica: [7,8,9]
    }]
  });

  test('Adicionar música a uma playlist como usuário logado', ({given, when, then, and})=>{
    given(/^que eu sou um artista logado no sistema com nome "(.*)" e senha "(.*)"$/, async (name)=>{
      const existingTest = await mockPlaylistRepository.getPlaylist(name);

      if(existingTest){
        await mockPlaylistRepository.deletePlaylist(name);
      }
    });
    when(/^uma requisição POST for enviada para "(.*)" com o nome "(.*)"$/,
    async (url, testName)=>{
      response = await request.put(url).send({
        id_musica: [12]
      });
    });

    then(/^o sistema retorna um JSON com o corpo "(.*)"$/, async (responseTest) =>{
      // let response = JSON.parse(responseTest);
      // expect(mockGetPlaylist()).toMatchObject(response)
      expect.objectContaining(responseTest)
    })

    and(/^é retornado um status "(.*)" como adicionado com sucesso$/, async (responseStatusCode) =>{
      expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
    })
  })

  // test('Excluir item da playlist como usuário logado e proprietário da playlist', ({given, when, then, and})=>{
  //   given(/^que eu sou um artista logado no sistema com nome "(.*)" e senha "(.*)"$/, async (name)=>{
  //     const existingTest = await mockPlaylistRepository.getPlaylist(name);

  //     if(existingTest){
  //       await mockPlaylistRepository.deletePlaylist(name);
  //     }
  //   });
  //   when(/^uma requisição POST for enviada para "(.*)" para remover a música "(.*)"$/,
  //   async (url, testName)=>{
  //     response = await request.post(url).send({
  //       name: testName,
  //     });
  //   });
  //   and(/^eu sou proprietário da playlist de id "(.*)"$/, async (responseStatusCode) =>{
  //     expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
  //   })


  //   then(/^o sistema retorna um JSON com o corpo "(.*)"$/, async (responseTest) =>{
  //     console.log(responseTest)
  //       expect.objectContaining(responseTest)
  //   })

  //   and(/^é retornado um status "(.*)" como criado com sucesso$/, async (responseStatusCode) =>{
  //     expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
  //   })
  // })
});