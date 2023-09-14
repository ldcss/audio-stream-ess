Feature: Cadastro e manutenção de playlists
    As a client que possui uma conta no sistema
    I want to adicionar/remover músicas de uma playlist e editá-la


    Scenario: Adicionar música a uma playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"
        And o sistema tem uma playlist com o id "1", duração "25", música de id "2"
        When uma requisição POST for enviada para a url "/api/playlist/{id_playlist}/adidionar", eu atualizo a duração da playlist para "6000"
        And eu atualizo a lista de músicas para
            """

            "[
                {
                "id": 2,
                "name": "Amo meu curso",
                "description": "Música #2 do álbum Lucas Daniel EP",
                "duration": 3000,
                "albumId": 1,
                "createdAt": "2023-09-14T05:39:44.436Z",
                "album": {
                    "id": "1",
                    "name": "Lucas Daniel EP",
                    "description": "Álbum feito com coração pelo aluno Lucas Daniel",
                    "createdAt": "2023-09-14T05:39:44.426Z",
                    "artistId": 7,
                    "released": true
                },
                {
                "id": 3,
                "name": "Odeio meu curso",
                "description": "Música #2 do álbum João EP",
                "duration": 3000,
                "albumId": 1,
                "createdAt": "2023-09-14T05:39:44.436Z",
                "album": {
                    "id": "2",
                    "name": "João EP",
                    "description": "Álbum feito com coração pelo aluno João",
                    "createdAt": "2023-09-14T05:39:44.426Z",
                    "artistId": 7,
                    "released": true
                    }
                }
            ]"
            """
        Then o sistema retorna um JSON com o corpo
            """
            {
    "id": 1,
    "name": "Melhores do grimes",
    "genre": "grimes",
    "description": "loucura",
    "ownerId": 1,
    "duration": "6000",
    "createdAt": "2019-01-16 22:03:12",
    "updatedAt": "2019-01-16 22:03:12",
    "music": [
        {
            "id": 2,
            "name": "Amo meu curso",
            "description": "Música #2 do álbum Lucas Daniel EP",
            "duration": 3000,
            "albumId": 1,
            "createdAt": "2023-09-14T05:39:44.436Z",
            "album": {
                "id": "1",
                "name": "Lucas Daniel EP",
                "description": "Álbum feito com coração pelo aluno Lucas Daniel",
                "createdAt": "2023-09-14T05:39:44.426Z",
                "artistId": 7,
                "released": true
            }
        },
        {
            "id": 3,
            "name": "Odeio meu curso",
            "description": "Música #2 do álbum João EP",
            "duration": 3000,
            "albumId": 1,
            "createdAt": "2023-09-14T05:39:44.436Z",
            "album": {
                "id": "2",
                "name": "João EP",
                "description": "Álbum feito com coração pelo aluno João",
                "createdAt": "2023-09-14T05:39:44.426Z",
                "artistId": 7,
                "released": true
            }
        }
    ]
}

            """
        And é retornado um status "200" como música adicionada com sucesso

    Scenario: Excluir música da playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"

        And o sistema tem uma playlist com o id "1", duração "3000", música de id "1" e user de id "1"
        When eu faço uma requisição DELETE para a url "/api/playlist/1/musica/1", pegando a música de id "1", eu atualizo a duração para "0"
        And eu atualizo a lista de músicas para para "[]"
        Then o sistema retorna um JSON com o corpo
            """
            {
                "id": 1,
                "name": "Melhores do grimes",
                "genre": "grimes",
                "description": "loucura",
                "ownerId": 1,
                "duration": "0",
                "createdAt": "2019-01-16 22:03:12",
                "updatedAt": "2019-01-16 22:03:12",
                "music": "[]"
            }
            """
        And é retornado um status "200" como deletado com sucesso