Feature: Cadastro e manutenção de artistas
      As um usuário moderador logado no sistema
      I want to poder editar e gerenciar os diversos artistas presentes no sistema

Scenario: Atualizar artista como usuário moderador
Given que eu sou um usuário moderador logado no sistema
And o sistema tem um artista cadastrado com o nome "Genesis"
When eu atualizo o nome do artista para "Yes"
Then o sistema confirma que o artista foi atualizado com sucesso

Scenario: Excluir artista como usuário moderador
Given que eu sou um usuário moderador logado no sistema
And há um artista cadastrado com o nome "Gentle Giant"
When eu excluo o artista
Then o sistema confirma que o artista foi removido com sucesso