Feature: Criação de categorias para playlists
    As a client que possui uma conta no sistema
    I want to categorizar (agrupar ou filtrar) playlists

GUI Scenario: Playlists sem categorias
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu não selecionar nenhum filtro
Then eu terei as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'

Service Scenario: Playlists sem categorias
Given que eu sou o usuário 'lucas'
And eu possuo as playlists já cadastradas 'melhores do grime' de id '1', 'melhores do mpb' de id '2' e 'UK Drill' de id '3'
When eu não selecionar tanto o filtro de gênero quanto o filtro de duração
Then eu terei todas as playlists, que possuem id '1', '2' e '3'

GUI Scenario: Playlists por gênero
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar o filtro para o gênero 'mpb' 
Then eu terei apenas a playlist 'melhores do mpb'

Service Scenario: Playlists por gênero
Given que eu sou o usuário 'lucas'
And eu possuo as playlists já cadastradas 'melhores do grime' de id '1', 'melhores do mpb' de id '2' e 'UK Drill' de id '3'
When eu selecionar o filtro para o gênero 'mpb'
Then eu terei apenas a playlists de id '2' 

GUI Scenario: Playlists por duração
Given que eu sou o usuário 'lucas'
And eu tenho as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar o filtro de duração 'menor que 30m'
Then eu terei apenas as playlists 'melhores do grime' e 'UK Drill'

Service Scenario: Playlists por duração
Given que eu sou o usuário 'lucas' de 'id' 4
And eu possuo as playlists já cadastradas 'melhores do grime' de id '1', 'melhores do mpb' de id '2' e 'UK Drill' de id '3'
When eu selecionar o filtro de duração 'menor que 30m'
Then eu terei apenas as playlists de id '1' e id '3'

GUI Scenario: Playlists por duração e gênero
Given que eu sou o usuário 'lucas' 
And eu já tenho cadastrado as playlists 'melhores do grime', 'melhores do mpb' e 'UK Drill'
When eu selecionar os filtros de gênero 'grime' e duração 'menor que 30m'
Then eu terei apenas a playlist 'melhores do grime'

Service Scenario: Playlists por duração e gênero
Given que eu sou o usuário 'lucas'
And eu possuo as playlists já cadastradas 'melhores do grime' de id '1', 'melhores do mpb' de id '2' e 'UK Drill' de id '3' 
When eu selecionar o filtro de gênero 'grime' e duração 'menor que 30m'
Then eu terei apenas a playlist de id '1'

GUI Scenario: Playlists sem músicas
Given que eu sou o usuário 'lucas' 
And eu tenho apenas a playlist 'melhores do mpb' criada
And a playlist 'melhores do mpb' não possui nenhuma música
When eu selecionar a playlist 'melhores do mpb'
Then a playlist trará uma tabela vazia de músicas

Service Scenario: Playlists sem músicas
Given que eu sou o usuário 'lucas' 
And eu tenho apenas a playlist 'melhores do mpb' de id '1' criada
And a playlist 'melhores do mpb' não possui nenhuma música cadastrada
When eu selecionar a playlist 'melhores do mpb'
Then a playlist trará uma lista vazia de músicas
