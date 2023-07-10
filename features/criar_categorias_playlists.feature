Feature: Criação de categorias para playlists
    As a client que possui uma conta no sistema
    I want to categorizar (agrupar ou filtrar) playlists

Scenario: Playlists por gênero
Given que eu sou um usuário logado no sistema
And eu tenho algumas playlists criadas
When eu selecionar os filtros de gênero
Then eu terei apenas as playlists daqueles gêneros

Scenario: Playlists por duração
Given que eu sou um usuário logado no sistema
And eu tenho algumas playlists criadas
When eu selecionar os filtros de duração
Then eu terei apenas as playlists daquela duração

Scenario: Playlists por duração e gênero
Given que eu sou um usuário logado no sistema
And eu tenho algumas playlists criadas
When eu selecionar os filtros de gênero e duração
Then eu terei apenas as playlists daqueles gêneros com aquela duração