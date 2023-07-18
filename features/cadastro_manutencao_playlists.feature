Feature: Cadastro e manutenção de playlists
      As a client que possui uma conta no sistema
      I want to adicionar/remover músicas de uma playlist e editá-la

Scenario: Adicionar música a uma playlist como usuário logado
Given que eu sou um usuário logado no sistema com login "joao" e senha "pedro"
And sou proprietário da playlist "num.1"
When eu adiciono uma música com o nome "mesa de bar"
Then o sistema confirma que a música "mesa de bar" foi adicionada com sucesso à playlist "num.1"

Scenario: Atualizar a quantidade de músicas e tempo da playlist quando cadastro uma música como usuário logado
Given que eu sou um usuário de login "joao" e senha "12345678" logado no sistema
And sou proprietário da playlist de título "num.1"
And eu tenho uma quantidade n de músicas na playlist de título "num.1"
And a playlist tem um tempo de duração m de reprodução
When eu adiciono uma música com nome "mesa de bar" com duração x
Then o tempo de duração da playlist é atualizado para m+x
And a quantidade de músicas da playlist é atualizada para n+1

Scenario: Excluir item da playlist como usuário logado e proprietário da playlist
Given que eu sou um artista logado no sistema com login "jonas" e senha "1234"
And eu sou proprietário da playlist de título "num.1"
When eu removo a música "canto sombrio" da playlist "num.1"
Then o sistema confirma que a música "canto sombrio" foi removida com sucesso da playlist "num.1"

mudanças desnecessárias