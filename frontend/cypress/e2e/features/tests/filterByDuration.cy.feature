describe('template spec', () => {
  it('Tenta filtrar por gênero', () => {
    cy.visit('http://localhost:5173/playlist');
    cy.get("#select_duration").click();
    cy.get("#d1").click();
    cy.get("#0").click();
  });
});
