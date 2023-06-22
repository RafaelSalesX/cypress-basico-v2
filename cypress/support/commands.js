Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Sales')
    cy.get('#email').type('rafaelsalese.e@gmail.com')
    cy.get('#open-text-area').type('TESTE')
    cy.contains('button', 'Enviar').click()

})