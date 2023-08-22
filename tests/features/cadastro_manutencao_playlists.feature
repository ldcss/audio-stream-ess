Feature: Cadastro e manutenção de playlists
    As a client que possui uma conta no sistema
    I want to adicionar/remover músicas de uma playlist e editá-la


    Scenario: Adicionar música a uma playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"
        And o sistema tem uma playlist com o id "1", duracao "25", músicas "[1,2,3]" e quantidade de músicas "3"
        When eu atualizo a duração para "28"
        And eu atualizo a lista de músicas para para "[1,2,3,4]"
        And eu atualizo a quantidade de músicas para "4"
        Then o sistema retorna um JSON com o corpo
            """
            {
            "id": "1",
            "name": "melhores do grime",
            "genre": "grime",
            "description": "",
            "idUser": 0,
            "duration": "28",
            "qtdMusicas": "4",
            "id_musica": "[1,2,3,4]"
            }
            """
        And é retornado um status "200" como adicionado com sucesso

    Scenario: Excluir música da playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"
        And o sistema tem uma playlist com o id "1", duracao "25", músicas "[1,2,3]" e quantidade de músicas "3"
        When eu desejo remover a música de id "3", eu atualizo a duração para "12"
        And eu atualizo a lista de músicas para para "[1,2]"
        And eu atualizo a quantidade de músicas para "2"
        Then o sistema retorna um JSON com o corpo
            """
            {
            "id": "1",
            "name": "melhores do grime",
            "genre": "grime",
            "description": "",
            "idUser": 0,
            "duration": "12",
            "qtdMusicas": "2",
            "id_musica": "[1,2]"
            }
            """
        And é retornado um status "200" como adicionado com sucesso
# API
# When uma requisição POST for enviada para "/api/playlist/{id_playlist}/remover/{id_musica}" para remover a música "canto sombrio"
# And eu sou proprietário da playlist de id "{id_playlist}"
# Then o sistema retorna um JSON com o corporation
# """
# [
#     {"message: item removido com sucesso da playlist"}
# ]
# """
# And é retornado um status "200" como criado com sucesso

# Scenario: Visualizar todas as curtidas com 1 ou mais curtidas
# Given que eu sou um usuário logado no sistema com nome "Lucas"
# When eu faço uma requisição GET "/api/playlist/{id_playlist}/curtidas"
# Then é retornado um JSON com corpo
# """
# [
#     {"id_usuario":1, "name_usuario":"marcelo"},
#     {"id_usuario":2, "name_usuario":"enderson"}
# ]
# """

# Scenario: Adicionar música a uma playlist como usuário logado
# Given que eu sou um usuário logado no sistema com login "joao" e senha "pedro"
# And sou proprietário da playlist "num.1"
# When eu adiciono uma música com o nome "mesa de bar"
# Then o sistema confirma que a música "mesa de bar" foi adicionada com sucesso à playlist "num.1"

# Scenario: Atualizar a quantidade de músicas e tempo da playlist quando cadastro uma música como usuário logado
# Given que eu sou um usuário de login "joao" e senha "12345678" logado no sistema
# And sou proprietário da playlist de título "num.1"
# And eu tenho uma quantidade n de músicas na playlist de título "num.1"
# And a playlist tem um tempo de duração m de reprodução
# When eu adiciono uma música com nome "mesa de bar" com duração x
# Then o tempo de duração da playlist é atualizado para m+x
# And a quantidade de músicas da playlist é atualizada para n+1

# Scenario: Excluir item da playlist como usuário logado e proprietário da playlist
# Given que eu sou um artista logado no sistema com login "jonas" e senha "1234"
# And eu sou proprietário da playlist de título "num.1"
# When eu removo a música "canto sombrio" da playlist "num.1"
# Then o sistema confirma que a música "canto sombrio" foi removida com sucesso da playlist "num.1"