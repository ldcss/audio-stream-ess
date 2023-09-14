describe('template spec', () => {
  it('Tenta compartilhar um link', () => {
    
    cy.visit('http://localhost:5173/user/1/playlist/1');
    
    cy.get("#share_link_button").click();

    cy.window.then(win => {
      win.navigator.clipboard.readText().then(text => cy.visit(text))
    })
  });
});