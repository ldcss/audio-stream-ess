Feature: Gerar um link compartilhável de páginas personalizadas
    As a client que possui uma conta no sistema
    I want to compartilhar playlists com meus amigos

GUI Scenario: Criar link de compartilhamento de playlists
Given que eu sou o usuário 'lucas'
And eu estou na página da playlist 'melhores do grime'
When eu clicar no ícone de compartilhamento da playlist
Then a url da playlist 'melhores do grime' será copiada para a minha clipboard
