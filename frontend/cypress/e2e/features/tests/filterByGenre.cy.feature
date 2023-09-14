describe('template spec', () => {
  it('Tenta filtrar por gênero', () => {
    cy.visit('http://localhost:5173/playlist');
    cy.get("#select_genre").click();
    cy.get("#forro").click();
    cy.get("#0").click();
  });
});

