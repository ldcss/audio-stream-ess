Feature: Analise de criadores e curtidas
As a client que possui uma conta no sistema
I want to visualizar a quantidade de curtidas/criadores

Scenario: Visualizar todas as curtidas com 1 ou mais curtidas
Given que eu sou um usuário logado no sistema com nome "Lucas"
When eu faço uma requisição GET "/api/playlist/{id_playlist}/curtidas"
Then é retornado um JSON com corpo
"""
[
    {"id_usuario":1, "name_usuario":"marcelo"},
    {"id_usuario":2, "name_usuario":"enderson"}
]
"""