Feature: Criar uma pagina de login 
    As a client que possui uma conta no sistema
    I want to fazer o login do client com o tipo de conta correta
    So that eu posso controlar as permissões de cada conta

Scenario: Login como usuario
    Given que eu estou na pagina de login
    and "usuario01" está cadastrado 
    and "usuario01" tem permissão de usuario
    when eu tento entrar com o login "usuario01" e senha "teste123"
    then eu vejo a página principal do app

Scenario: Login usuario não cadastrado
    Given que eu estou na pagina de login
    and "usuario02" não está está cadastrado
    when eu tento entrar com o login "usuario02" e senha "teste123"
    then eu vejo uma mensagem de usuário não existente
    and volto para página de login

Scenario: Login com senha errada
    Given que eu estou na pagina de login
    and "usuario01" está está cadastrado
    when eu tento entrar com o login "usuario01" e senha "123teste"
    then eu vejo uma mensagem de senha incorreta
    and volto para página de login
