describe('Central de Atendimento ao Cliente TAT', function() {

  const Three_Seconds_In_Ms = 3000

  beforeEach(function() {
    cy.visit('./src/index.html')
  });

    Cypress._.times(2,() => {
    it('verifica o título da aplicação', function() {
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
  });

    it('Preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Teste,teste,teste,Teste,teste,testeTeste,teste,testeTeste,teste,testeTeste,teste,testeTeste,teste,teste'

      cy.clock()

      cy.get('#firstName').type('Rafael')
      cy.get('#lastName').type('Sales')
      cy.get('#email').type('rafaelsalese.e@gmail.com')
      cy.get('#open-text-area').type(longText,{delay:0})
      cy.contains('button', 'Enviar').click()

      cy.get('.success > strong').should('be.visible')

      cy.tick(Three_Seconds_In_Ms)

      cy.get('.success > strong').should('not.be.visible')
    });

    it('Exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.clock()

      cy.get('#firstName').type('Rafael')
      cy.get('#lastName').type('Sales')
      cy.get('#email').type('rafaelsalese.e@gmail,com')
      cy.get('#open-text-area').type('TESTE')
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')

      cy.tick(Three_Seconds_In_Ms)
      
      cy.get('.error').should('not.be.visible')
    });

      //validando o campo telefone que só recebe caracteres numéricos
    it('Campo do número de telefone apenas com caracteres numéricos', function(){
      cy.get('#phone').type('hehehehe')
      .type('hahaha')
      .should('have.value', '')
      
    });

    it('Exibe mensagem de erro quando o telefone se torna obrigatóirio mas não é preenchido antes do envio do formulário', function(){
      cy.clock()

      cy.get('#firstName').type('Rafael')
      cy.get('#lastName').type('Sales')
      cy.get('#email').type('rafaelsalese.e@gmail.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('TESTE')
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')

      cy.tick(Three_Seconds_In_Ms)
      cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome. sobrenome, email e telefone', function() {
      cy.get('#firstName')
      .type('Rafael')
      .should('have.value', 'Rafael')
      .clear()
      .should('have.value', '')

      cy.get('#lastName')
      .type('Sales')
      .should('have.value', 'Sales')
      .clear()
      .should('have.value', '')

      cy.get('#email')
      .type('rafaelsales@gmail.com')
      .should('have.value', 'rafaelsales@gmail.com')
      .clear()
      .should('have.value', '')

      cy.get('#phone')
      .type('123435')
      .should('have.value', '123435')
      .clear()
      .should('have.value', '')

    });

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    });

    it('Envia o formulário com sucesso usando um comando costumizado', function() {

      cy.clock()

      cy.fillMandatoryFieldsAndSubmit()
      
      cy.get('.success > strong').should('be.visible')

      cy.tick(Three_Seconds_In_Ms)
      
      cy.get('.success > strong').should('not.be.visible')
    });

    it('Seleciona um produto (Youtube) por seu texto ', function(){
      //cy.get('select').select('YouTube')
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    });

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    });

    it('Seleciona produto (Blog) por seu índice', function() {
      cy.get('select').select(1).should('have.value','blog')
    });

    it('Marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    });

    it('Seleciona elemento do tipo (radio)', function(){
      cy.get('#email-checkbox')
      .check()
      .should('have.value', 'email')
      
    });

    //Seleciona todos os campos do tipo 'radio' e valida os campos checados
    it('Marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    });

    it('Marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .last() //seleciona a ultima opção, no caso do checkbox
      .uncheck() //desmarca campo checkbox
      .should('not.be.checked') //verifica se o campo não está ativado, no caso o campo do checkbox não está clicado
    });

    it('Seleciona o arquivo da pasta "fixtures"', function()  {
      //cy.get('input[type="file"]')
      cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    });

    it('Seleciona o arquivo simulando um drag-and-drop', function()  {
      cy.get('input[type="file"]')
      //cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop' })
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
    });

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function() {
      cy.fixture('example.json').as('arquivo-exemplo')  //pegando arquivo e nomeando como 'arquivo-exemplo'
      cy.get('input[type="file"]')
        .selectFile('@arquivo-exemplo')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function()  {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')    
      //verifica se o campo contêm o atributo '_blank' que abre em outra aba
    });

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy a').invoke('removeAttr', 'target').click()
      
      cy.contains('Talking About Testing').should('be.visible')
    });

    it('Exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => { //Mostrar e esconder um elemento na tela
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    })



    it('Preenche a área de texto usando o comando invoke ', function() {
      const longText = Cypress._.repeat('129837129873', 15)

      cy.get('#open-text-area')
      .invoke('val', longText) //val = valor
      .should('have.value', longText)
    });

    it('Faz uma requisição HTTP', () => { //teste de Api Aaaaaaa
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response){
        const{status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')

      })
      
    });

    it('Encontra o gato ', () => {
      cy.get('#cat').invoke('show').should('be.visible')
      cy.get('#cat').invoke('hide').should('not.be.visible')
    });
});
