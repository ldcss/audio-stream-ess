Feature: Cadastro e manutenção de álbuns
      As a client que possui uma conta no sistema
      I want to cadastar/remover/exluir um álbum

Scenario: Cadastrar álbum como artista logado
Given que eu sou um artista logado no sistema
When eu cadastro um novo álbum com o nome "Meu Álbum"
Then o sistema confirma que o álbum foi cadastrado com sucesso

Scenario: Atualizar álbum como artista logado
Given que eu sou um artista logado no sistema
And eu tenho um álbum cadastrado com o nome "Meu Álbum"
When eu atualizo o nome do álbum para "Novo Nome do Álbum"
Then o sistema confirma que o álbum foi atualizado com sucesso

Scenario: Excluir álbum como artista logado
Given que eu sou um artista logado no sistema
And eu tenho um álbum cadastrado com o nome "Meu Álbum"
When eu excluo o álbum
Then o sistema confirma que o álbum foi removido com sucesso