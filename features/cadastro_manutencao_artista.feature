Feature: Cadastro e manutenção de artistas
      As um artista que não possui uma conta no sistema
      I want to me cadastar no sistema e poder editar meus dados posteriormente

Scenario: Cadastrar artista
Given que eu sou um artista não presente no sistema
When eu preencho meus dados de "nome", "gênero" e "descrição"
And eu submeto as informações
Then o sistema confirma que o artista foi cadastrado com sucesso