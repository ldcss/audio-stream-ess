/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import ArtistRepository from '../../src/repositories/artist.repository';

const feature = loadFeature('tests/features/cadastro_manutencao_artista.feature');

const request = supertest(app);

const createMail = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 8) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

defineFeature(feature, test => {
  let reqMock: {
    name: string;
    genre: string;
    description: string;
    email: string;
    password: string;
    type: number;
  };
  let mockArtistRepository: ArtistRepository;
  let response: supertest.Response;
  const mail = createMail();

  beforeEach(() => {
    mockArtistRepository = di.getRepository<ArtistRepository>(ArtistRepository);
  });

  test('Cadastrar artista', ({ given, when, and, then }) => {
    given(/^que eu sou um artista de nome "(.*)" não presente no sistema$/, arg0 => {});

    when(
      /^eu preencho meus dados de name, genre, description, email e password com os valores respectivos "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/,
      (arg5, arg6, arg7, arg8, arg9) => {
        reqMock = {
          name: arg5,
          genre: arg6,
          description: arg7,
          email: mail,
          password: arg9,
          type: 1,
        };
      },
    );

    and(/^uma requisição POST for enviada para "(.*)"$/, async url => {
      response = await request.post(url).send(reqMock);
      console.log('reponse was', response);
    });

    then(/^o status da resposta deve ser "(.*)"$/, statusCode => {
      expect(response.status).toBe(parseInt(statusCode, 10));
    });

    and(
      /^O JSON da resposta contem um artista com os valores de name, genre, description, email e password iguais a "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", respectivamente$/,
      (arg5, arg6, arg7, arg8, arg9) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            id: '',
            name: arg5,
            genre: arg6,
            description: arg7,
            email: mail,
            pass: arg9,
          }),
        );
      },
    );
  });
});
