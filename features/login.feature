Feature: Criar uma pagina de login 
    As a client que possui uma conta no sistema
    I want to fazer o login do client com seu tipo de conta correta
    So that eu posso controlar as permissões de cada conta

Scenario: Login como artista
    Given que eu estou na pagina de login
    when eu entro com o usuário "artista01" e senha "teste123"
    then eu vejo a pagina de gerenciamento do artista

Scenario: Login como usuario
    Given que eu estou na pagina de login
    when eu entro com o usuário "usuario01" e senha "teste123"
    then eu vejo a pagina principal do app