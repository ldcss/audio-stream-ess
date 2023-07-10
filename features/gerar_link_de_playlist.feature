Feature: Gerar um link compartilhável de páginas personalizadas
    As a client que possui uma conta no sistema
    I want to compartilhar playlists com meus amigos

Scenario: Criar link de compartilhamento de playlists
Given que eu sou um usuário logado no sistema
And eu estou na página de alguma playlist
When eu clicar no ícone de compartilhamento da playlist
Then a url do álbum da playlist será copiada para a minha clipboard