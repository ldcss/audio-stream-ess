import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

// Given(
//   "que eu sou um usuario na pagina {string}", (page: string)=>{
//     cy.visit(page)
//     console.log("aqui doido",page)
//   }
// )

When(
  "o usuario clicar no {string}", (botao)=>{
    cy.visit('http://localhost:5173/pagina-teste')
    cy.getDataCy(botao).click()
  }
)

Then(
  "o usuario verá a menssem {string}", (menssagem)=>{
    // const text = cy.getDataCy(menssagem)
    expect(menssagem).to.equal("Olá mundo TESET")
  }
)