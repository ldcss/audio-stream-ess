Feature: Cadastro e manutenção de playlists
      As a client que possui uma conta no sistema
      I want to adicionar/remover músicas de uma playlist e editá-la


API
Scenario: Adicionar música a uma playlist como usuário logado
Given que eu sou um artista logado no sistema com nome "nome_artista" e senha "senha_artista"
When uma requisição POST for enviada para "/api/playlist/{id_playlist}/cadastro" com o nome "playlist"
Then o sistema retorna um JSON com o corpo 
"""
[
    {"message":"Música cadastrada na playlist com sucesso."}
]
"""
And é retornado um status "200" como criado com sucesso

API
Scenario: Excluir item da playlist como usuário logado e proprietário da playlist
Given que eu sou um artista logado no sistema com nome "nome_artista" e senha "senha_artista"
When uma requisição POST for enviada para "/api/playlist/{id_playlist}/remover/{id_musica}" para remover a música "canto sombrio"
And eu sou proprietário da playlist de id "{id_playlist}"
Then o sistema retonra um JSON com o corporation
"""
[
    {"message: item removido com sucesso da playlist"}
]
"""
And é retorando um status "200" como criado com sucesso

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