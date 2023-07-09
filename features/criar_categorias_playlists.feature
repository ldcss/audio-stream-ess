Feature: Criação de categorias para playlists
    As a client que possui uma conta no sistema
    I want to categorizar (agrupar ou filtrar) playlists

Scenario: Criar categorias para playlists
Given que eu sou um usuário logado no sistema
And eu tenho algumas playlists criadas
When eu selecionar os filtros de gênero e duração
Then eu terei apenas as playlists daquelas categorias