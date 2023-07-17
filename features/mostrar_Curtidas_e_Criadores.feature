Feature : Analise de criadores e curtidas

As a client que possui uma conta no sistema
I want to visualizar a quantidade de curtidas/criadores

Cenário 1: Visualizar todas as curtidas, 1 ou mais curtidas

Given que eu sou um usuário “logado” no sistema
When acesso a pagina “Playlist 4”
And a playlist tem duas “curtidas”
When seleciono a opção “curtidas”
Then é aberta uma pagina “Curtidas”
And a pagina “Curtidas” mostra “Marcelo” e “Lucas”

Cenário 2: Visualizar todas as curtidas, 0 curtidas

Given que eu sou um usuário “logado” no sistema
When acesso a pagina “Playlist 4”
And a playlist tem zero “curtidas”
When seleciono a opção “curtidas”
Then é aberta uma pagina “Curtidas”
And a pagina “Curtidas” está vazia

Cenário 3: Visualizar todos os criadores

Given que eu sou um usuário “logado” no sistema
When acesso a pagina “Playlist 4”
And a playlist tem dois “criadores”
When seleciono a opção “criadores”
Then é aberta uma pagina “Criadores”
And a página “Criadores” mostra os criadores “Marcelo” e “João”
Then