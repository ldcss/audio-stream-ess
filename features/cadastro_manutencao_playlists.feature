Feature: Cadastro e manutenção de playlists
      As a client que possui uma conta no sistema
      I want to adicionar/remover músicas de uma playlist e editá-la

Scenario: Adicionar música a uma playlist como usuário logado
Given que eu sou um usuário logado no sistema
And sou proprietário da playlist
When eu adiciono uma música com o nome "mesa de bar"
Then o sistema confirma que a música foi adicionada com sucesso

Scenario: Atualizar a quantidade de músicas e tempo da playlist quando cadastro uma música como usuário logado
Given que eu sou um usuário logado no sistema
And sou proprietário da playlist de título "num.1"
And eu tenho uma quantidade n de músicas na playlist de título "num.1"
And a playlist tem um tempo de duração m de reprodução
When eu adiciono uma música com nome "mesa de bar" com duração x
Then o tempo de duração da playlist é atualizado para m+x
And a quantidade de músicas da playlist é atualizada para n+1

Scenario: Excluir item da playlist como usuário logado e proprietário da playlist
Given que eu sou um artista logado no sistema
And eu sou proprietário da playlist de título "num.1"
When eu removo uma música da playlist
Then o sistema confirma que a música foi removida com sucesso da playlist