import { loadFeature, defineFeature } from "jest-cucumber"
import supertest from "supertest";
import app from "../../src/app"
import TestRepository from "../../src/repositories/test.repository";
import { di } from "../../src/di"

const feature = loadFeature('tests/features/cadastro_manutencao_playlist.feature')
const request = supertest(app)

defineFeature(feature, (test) => {
  // mocking the repository
  let mockTestRepository: TestRepository;
  let response: supertest.Response;

  // Antes de cada test ser rodado, ele reseta o mockRepository
  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
  });

  test('Adicionar música a uma playlist como usuário logado', ({given, when, then, and})=>{
    given(/^que eu sou um artista logado no sistema com nome "(.*)" e senha "(.*)"$/, async (name)=>{
      const existingTest = await mockTestRepository.getTest(name);

      if(existingTest){
        await mockTestRepository.deleteTest(name);
      }
    });
    when(/^uma requisição POST for enviada para "(.*)" com o nome "(.*)"$/,
    async (url, testName)=>{
      response = await request.post(url).send({
        name: testName,
      });
    });

    then(/^o sistema retorna um JSON com o corpo "(.*)"$/, async (responseTest) =>{
      console.log(responseTest)
        expect.objectContaining(responseTest)
    })

    and(/^é retornado um status "(.*)" como criado com sucesso$/, async (responseStatusCode) =>{
      expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
    })
  })

  test('Excluir item da playlist como usuário logado e proprietário da playlist', ({given, when, then, and})=>{
    given(/^que eu sou um artista logado no sistema com nome "(.*)" e senha "(.*)"$/, async (name)=>{
      const existingTest = await mockTestRepository.getTest(name);

      if(existingTest){
        await mockTestRepository.deleteTest(name);
      }
    });
    when(/^uma requisição POST for enviada para "(.*)" para remover a música "(.*)"$/,
    async (url, testName)=>{
      response = await request.post(url).send({
        name: testName,
      });
    });
    and(/^eu sou proprietário da playlist de id "(.*)"$/, async (responseStatusCode) =>{
      expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
    })


    then(/^o sistema retorna um JSON com o corpo "(.*)"$/, async (responseTest) =>{
      console.log(responseTest)
        expect.objectContaining(responseTest)
    })

    and(/^é retornado um status "(.*)" como criado com sucesso$/, async (responseStatusCode) =>{
      expect(response.statusCode).toBe(parseInt(responseStatusCode, 10))
    })
  })
});