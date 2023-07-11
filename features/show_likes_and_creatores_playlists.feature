Feature:  Mostrar seguidores e donos da playlist


Scenario: Tentativa de visualizar todos os seguidores/curtidas, se tiver 1 ou mais seguidores
  Given a Playlist tem 7 seguidores/curtidas 
  When o número de seguidores/curtidas é clicado
  Then é aberta uma lista
  And essa lista mostra os seguidores/curtidas


Scenario: Tentativa de visualizar todos os seguidores/curtidas, se não tiver seguidores/curtidas
  Given a Playlist tem 0 seguidores/curtidas 
  When o número de seguidores/curtidas é clicado
  Then é aberta uma lista vazia

Scenario: Tentativa de visualizar todos os criadores/colaboradores
  Given a Playlist tem 1 ou mais colaborador 
  When o número de criador/colaborador é clicado
  Then é aberta uma lista com os criadores/colaboradores

Scenario: Tentativa de visualizar todos os criadores/colaboradores, se não tiver criadores/colaboradores
  Given a Playlist tem 0 criadores/colaboradores
  When o número de criadores/colaboradores é clicado
  Then é aberta uma lista vazia
  


  
