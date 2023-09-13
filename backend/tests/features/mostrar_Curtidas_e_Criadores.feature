Feature: Analise de criadores e curtidas
As a client que possui uma conta no sistema
I want to visualizar a quantidade de curtidas/criadores

Scenario: Visualizar todas as curtidas com 1 ou mais curtidas
Given que eu sou um usuário logado no sistema com o id "1"
When eu faço uma requisição GET "/api/playlist/1/curtidas" com o corpo
"""
[
    {
        "id": 1,
        "name": "melhores do grime",
        "genre": "grime",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "marcelo"}
        ]
    },
    {
        "id": 2,
        "name": "melhores do mpb",
        "genre": "mpb",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "enderson"},
            {"name": "pedro"}
        ]
    },
    {
        "id": 3,
        "name": "UK Drill",
        "genre": "drill",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": []
    }
]
"""
Then é retornado um JSON com corpo
"""
[
    {"name":"marcelo"},
    {"name":"enderson"}
]
"""
And é retornado um status "200" OK


Scenario: Visualizar todos os criadores
Given que eu sou um usuário logado no sistema com o id "1"
When eu faço uma requisição GET "/api/playlist/1/createdBy" com o corpo
"""
[
    {
        "id": 1,
        "name": "melhores do grime",
        "genre": "grime",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "marcelo"}
        ]
    },
    {
        "id": 2,
        "name": "melhores do mpb",
        "genre": "mpb",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "enderson"},
            {"name": "pedro"}
        ]
    },
    {
        "id": 3,
        "name": "UK Drill",
        "genre": "drill",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": []
    }
]

"""
Then é retornado um JSON com corpo "2"
And é retornado um status "200" OK


Scenario: Visualizar playlist sem curtidas
Given que eu sou um usuário logado no sistema com o id "1"
When eu faço uma requisição GET "/api/playlist/1/curtidas" com o corpo
"""
[
    {
        "id": 1,
        "name": "melhores do grime",
        "genre": "grime",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "marcelo"}
        ]
    },
    {
        "id": 2,
        "name": "melhores do mpb",
        "genre": "mpb",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": [
            {"name": "lucas"},
            {"name": "enderson"},
            {"name": "pedro"}
        ]
    },
    {
        "id": 3,
        "name": "UK Drill",
        "genre": "drill",
        "description": "",
        "ownerId": 2,
        "duration": 0,
        "likes": []
    }
]
"""
Then é retornado um JSON com corpo
"""
[]
"""
And é retornado um status "200" OK