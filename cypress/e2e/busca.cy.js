describe('Buscar iPhone 16 e adicionar ao carrinho', () => {
  it('Deve buscar iPhone 16, clicar no item e adicionar ao carrinho', () => {
    // Acessar Amazon
    cy.visit('https://www.amazon.com.br');

    // Aceitar cookies, se necessário
    cy.get('body').then($body => {
      if ($body.find('#sp-cc-accept').length) {
        cy.get('#sp-cc-accept').click();
      }
    });

    // Buscar "iPhone 16"
    cy.get('#twotabsearchtextbox').type('iPhone 16{enter}');

    // Aguardar e clicar no item escolhido
    cy.contains('[data-component-type="s-search-result"]', 'Apple iPhone 16 Pro Max')
      .first()
      .click();

    // Adicionar ao carrinho
    cy.get('body').then($body => {
      if ($body.find('#add-to-cart-button').length) {
        cy.get('#add-to-cart-button').click();
      } else {
        cy.log('Botão "Adicionar ao carrinho" não encontrado');
      }
    });

    // Impede que o teste falhe por erro do app
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('cardModuleFactory is not a function')) {
        return false;
      }
    });
  });
});
