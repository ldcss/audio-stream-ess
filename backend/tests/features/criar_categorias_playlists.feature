Feature: Criação de categorias para playlists
      As a client que possui uma conta no sistema
      I want to categorizar (agrupar ou filtrar) playlists

#API
Scenario: Playlist sem categoria
Given que eu sou um usuário logado no sistema com o id "0"
When uma requisição GET for enviada para "/api/playlist"
Then o sistema retorna um JSON com o corpo
"""
[{"id": 1, "name": "melhores do grime","genre": "grime","description": "","ownerId": 0,"duration": 1800000},
{"id": 2, "name": "melhores do mpb","genre": "mpb","description": "","ownerId": 0,"duration": 3600000},
{"id": 3, "name": "UK Drill","genre": "drill","description": "","ownerId": 0,"duration": 7200000}]
"""
And é retornado um status "200" OK

Scenario: Playlists por gênero
Given que eu sou um usuário logado no sistema com o id "0"
When uma requisição GET for enviada para "/api/playlist?genre=mpb"
Then o sistema retorna um JSON com o corpo
"""
[{"id": 2, "name": "melhores do mpb","genre": "mpb","description": "","ownerId": 0,"duration": 3600000}]
"""
And é retornado um status "200" OK

Scenario: Playlists por duração
Given que eu sou um usuário logado no sistema com o id "0"
When uma requisição GET for enviada para "/api/playlist?duration=1800000"
Then o sistema retorna um JSON com o corpo
"""
[{"id": 1, "name": "melhores do grime","genre": "grime","description": "","ownerId": 0,"duration": 1800000}]
"""
And é retornado um status "200" OK

Scenario: Playlists por gênero e duração
Given que eu sou um usuário logado no sistema com o id "0"
When uma requisição GET for enviada para "/api/playlist?genre=drill?duration=7200000"
Then o sistema retorna um JSON com o corpo
"""
[{"id": 3, "name": "UK Drill","genre": "drill","description": "","ownerId": 0,"duration": 7200000}]
"""
And é retornado um status "200" OK

Scenario: Usuários sem playlist
Given que eu sou um usuário logado no sistema com o id "0"
When uma requisição GET for enviada para "/api/playlist"
And o sistema retorna um JSON com o corpo
"""
[]
"""
Then é retornado um status "200" OK
