Feature: Cadastro e manutenção de artistas
      As um artista que não possui uma conta no sistema
      I want to me cadastar no sistema e poder editar meus dados posteriormente

Scenario: Cadastrar artista
Given que eu sou um artista de nome "Chico Buarque" não presente no sistema
When eu preencho meus dados de "nome", "gênero" e "descrição", "login" e "senha" com os valores respectivos
"Chico Buarque", "MPB", "Cantor, compositor, dramaturgo, escritor e ator brasileiro", "chiquin123", "aba7788aba"
And eu submeto as informações
Then o sistema insere em seu banco de dados um artista com os valores de
"nome", "gênero" e "descrição", "login" e "senha" iguais a "Chico Buarque", 
"MPB", "Cantor, compositor, dramaturgo, escritor e ator brasileiro", "chiquin123", "aba7788aba", respectivamente
And o sistema confirma a inserção para o usuário