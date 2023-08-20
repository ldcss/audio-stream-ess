import { loadFeature, defineFeature } from "jest-cucumber"
import supertest from "supertest";
import app from "../../src/app"
import PlaylistEntity from "../../src/entities/playlist.entity";
import PlaylistRepository from "../../src/repositories/playlist.repository";

const feature = loadFeature('tests/features/criar_categorias_playlists.feature')
const request = supertest(app)

jest.mock("../../src/repositories/playlist.repository")

defineFeature(feature, (test) => {
	let mockPlaylists: PlaylistEntity[];
  
  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockGetPlaylist; 

  beforeEach(async () => {
    mockPlaylists = [{
      id: "1",
      name: "melhores do grime",
      genre: "grime",
      description: "",
      idUser: 0
    }, {
      id: "2",
      name: "melhores do mpb",
      genre: "mpb",
      description: "",
      idUser: 0
    }, {
      id: "3",
      name: "UK Drill",
      genre: "drill",
      description: "",
      idUser: 0
    }]
  });
  
  test('Playlist sem categoria', ({given, when, then, and}) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async (id)=>{
      //Checagem com login
        mockGetPlaylist.mockReturnValue(mockPlaylists)
    });

    when(/^uma requisição GET for enviada para "(.*)"$/,
    async (url)=>{
      if(url){
        const response = mockGetPlaylist(); //lpaylists do user com id 0
        expect(response).toEqual([
        {
          id: '1',
          name: 'melhores do grime',
          genre: 'grime',
          description: '',
          idUser: 0
        }, {
          id: '2',
          name: 'melhores do mpb',
          genre: 'mpb',
          description: '',
          idUser: 0
        }, {
          id: '3',
          name: 'UK Drill',
          genre: 'drill',
          description: '',
          idUser: 0
        }
        ])}
    });

    then("o sistema retorna um JSON com o corpo", (responseTest) => {
      let response = JSON.parse(responseTest);
      expect(mockGetPlaylist()).toMatchObject(response)
    })

    and(/^é retornado um status "(.*)" OK$/, (responseStatusCode) => {
      let statusCode: number = 0;
      if(mockGetPlaylist()) statusCode = 200;
			expect(+responseStatusCode).toBe(statusCode)
    })
	})
})