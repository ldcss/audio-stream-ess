describe('Adicionando uma música e deletando outra em seguida', () => {
  it('Tentativa de testar o funcionamento das 
  funcionalidades de adição e remção de música na playlist', () => {
    
    cy.visit('http://localhost:5173/user/1/playlist/1');
    cy.get("#addMusicButton").click();
    cy.get("#Ocupado").click();
    cy.contains('Ocupado')
    cy.get("#0").click();
  });
});
