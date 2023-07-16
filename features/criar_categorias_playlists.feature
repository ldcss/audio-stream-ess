Feature: Criação de categorias para playlists
    As a client que possui uma conta no sistema
    I want to categorizar (agrupar ou filtrar) playlists

Scenario: Playlists sem categorias
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu não selecionar nenhum filtro
Then eu terei as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill' na minha tela

Scenario: Playlists por gênero
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar o filtro para o gênero 'mpb' 
Then eu terei apenas a playlist 'melhores do mpb'

Scenario: Playlists por duração
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar o filtro de duração 'menor que 30m'
Then eu terei apenas as playlists 'melhores do grime' e 'UK Drill'

Scenario: Playlists por duração e gênero
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar os filtros de gênero 'grime' e duração 'menor que 30m'
Then eu terei apenas a playlist 'melhores do grime'

Scenario: Playlists sem músicas
Given que eu sou o usuário 'lucas' 
And eu tenho apenas a playlist 'melhores do mpb' criada
When eu selecionar a playlist 'melhores do mpb'
Then a playlist trará uma lista vazia de músicas