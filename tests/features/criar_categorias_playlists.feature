Feature: Criação de categorias para playlists
      As a client que possui uma conta no sistema
      I want to categorizar (agrupar ou filtrar) playlists

#API 
Scenario: Playlist sem categoria
Given que eu sou um usuário logado no sistema com o id "0" 
When uma requisição GET for enviada para "/api/playlist/0"
Then o sistema retorna um JSON com o corpo
"""
[{"id": "1", "name": "melhores do grime", "genre": "grime", "description": "", "idUser": 0},
{"id": "2", "name": "melhores do mpb", "genre": "mpb", "description": "", "idUser": 0},
{"id": "3", "name": "UK Drill", "genre": "drill", "description": "", "idUser": 0}]
"""
And é retornado um status "200" OK