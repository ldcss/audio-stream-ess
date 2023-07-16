Feature: Cadastro e manutenção de artistas
    As um artista logado no sistema
    I want to poder editar e gerenciar meus dados presentes no sistema

Scenario: Atualizar artista como artista logado
Given que eu sou um artista de "nome" "Moody Blues", de "id" "7" logado no sistema
And eu estou na página de "Gerenciamento de Artistas"
When eu abro a caixa de edição do artista "Moody Blues", de "id": "7", "descrição": "Banda de rock inglesa formada em 1964" e "gênero": "Rock"
And eu atualizo o campo "nome" para "Bob Dylan", o campo "descrição" para "Cantor e compositor americano" e o campo "gênero" para "Folk"
Then eu devo ver a mensagem "Artista atualizado com sucesso"
And eu devo ver o artista "Bob Dylan", de "id": "7", "descrição": "Cantor e compositor americano" e "gênero": "Folk" na lista de artistas
And o banco de dados deve ter o artista "Bob Dylan", de "id": "7", "descrição": "Cantor e compositor americano" e "gênero": "Folk"