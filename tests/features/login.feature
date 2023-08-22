Feature: Fazer login
    As a client que possui uma conta no sistema
    I want to fazer o login do client com o tipo de conta correta
    So that eu posso controlar as permissões de cada conta

Scenario: login como artista
    Given que o sistema está em funcionamento
    And "artista01" está cadastrado
    And a senha cadastrada é "teste123"
#    And "artista01" tem permissão de artista
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "artista01", "pass": "teste123"}
    """
    Then o sistema autoriza o login como "artista01"
    And o status retornado da requisição é "201"

Scenario: login como moderador
    Given que o sistema está em funcionamento
    And "moderador01" está cadastrado 
    And a senha cadastrada é "teste123"
#    and "moderador01" tem permissão de moderador
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "moderador01", "pass": "teste123"}
    """
    Then o sistema autoriza o login como "moderador01"
    And o status retornado da requisição é "201"

Scenario: login com credenciais incorretas
    Given que o sistema está em funcionamento
    And e vamos tentar o login como "moderador02" "123teste"
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "moderador02", "pass": "123teste"}
    """
    Then o sistema nega o login como "moderador02"
    And o status retornado da requisição é "301"





#Feature: Criar uma pagina de login 
#     As a client que possui uma conta no sistema
#     I want to fazer o login do client com o tipo de conta correta
#     So that eu posso controlar as permissões de cada conta


#Scenario: Login como artista
#    Given que eu estou na pagina de login
#    and "artista01" está cadastrado 
#    and a senha cadastrada é "teste123"
#    and "artista01" tem permissão de artista
#    when eu tento entrar com o login "artista01" e senha "teste123"
#    then eu vejo a página principal do app

#Scenario: Login como moderador
#    Given que eu estou na pagina de login
#    and "moderador01" está cadastrado 
#    and a senha cadastrada é "teste123"
#    and "moderador01" tem permissão de moderador
#    when eu tento entrar com o login "moderador01" e senha "teste123"
#    then eu vejo a página principal do app

#Scenario: Login usuario não cadastrado
#    Given que eu estou na pagina de login
#    and "usuario02" não está está cadastrado
#    when eu tento entrar com o login "usuario02" e senha "teste123"
#    then eu vejo uma mensagem de credenciais incorretas
#    and volto para página de login

#Scenario: Login com senha errada
#    Given que eu estou na pagina de login
#    and "usuario01" está está cadastrado
#    and a senha cadastrada é "teste123"
#    when eu tento entrar com o login "usuario01" e senha "123teste"
#    then eu vejo uma mensagem de credenciais incorretas
#    and volto para página de login
