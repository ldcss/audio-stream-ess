Feature: Adicionar e remover músicas de playlists como usuário
  As a usuário dono da playlist de id 1
  I want adicionar ou remover músicas da playlist
  so that eu posso ter uma tabela com as músicas atualizadas

Scenario:
    Given que sou um usuário na página "user/1/playlist/1"
    When eu clico no botão de adicionar música
    Then se abre uma lista de músicas para se adicionar
    And escolho a música com título "Amo meu curso"
    And a tabela de músicas na playlist é recarregada com a música adicionada

Scenario:
    Given que sou um usuário na página "user/1/playlist/1"
    When eu clico no ícone da lixeira na linha da música "Amo meu curso"
    Then a música com nome "Amo meu curso" é removida da playlist
    And a tabela é atualizada

    