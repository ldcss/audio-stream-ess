Feature: Gerar um link compartilhável de páginas personalizadas
    As a client que possui uma conta no sistema
    I want to compartilhar playlists com meus amigos

Scenario: Criar link de compartilhamento de playlists
Given que eu sou o usuário com id "0"
And eu estou na página da playlist
"""
{
  "id": 1,
  "name": "melhores do grime",
  "genre": "grime",
  "description": "",
  "ownerId": 0,
  "duration": 1800000
}
"""
When eu clicar no ícone de compartilhamento da playlist
"""
{
  "id": 1,
  "name": "melhores do grime",
  "genre": "grime",
  "description": "",
  "ownerId": 0,
  "duration": 1800000
}
"""
Then a url da playlist melhores do grime será "/api/user/0/playlist/1"
