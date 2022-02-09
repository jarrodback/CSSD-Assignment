describe('Navbar Tests', () => {

 before(() => {
    cy.login('test@email.com', 'test1')
 })
 
 context('Languages Dropdown', () => {
  it('shows 23 languages when the languages dropdown is clicked', () => {
   //Act
   cy.visit('/my-bills')
   cy.get('#languages').click()

   //Assert
   cy.get('#languages ul li').should('have.length', 23)
  })

  it('selected language changes to Bulgarian when the Bulgarian option is selected', () => {
   //Act
   cy.get('#Bulgarian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Bulgarian')
  })

  it('selected language changes to Czech when the Czech option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Czech').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Czech')
  })

  it('selected language changes to Danish when the Danish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Danish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Danish')
  })

  it('selected language changes to Dutch when the Dutch option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Dutch').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Dutch')
  })

  it('selected language changes to English when the English option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#English').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'English')
  })

  it('selected language changes to Estonian when the Estonian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Estonian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Estonian')
  })

  it('selected language changes to Finnish when the Finnish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Finnish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Finnish')
  })

  it('selected language changes to French when the French option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#French').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'French')
  })

  it('selected language changes to German when the German option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#German').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'German')
  })

  it('selected language changes to Greek when the Greek option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Greek').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Greek')
  })

  it('selected language changes to Hungarian when the Hungarian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Hungarian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Hungarian')
  })

  it('selected language changes to Irish when the Irish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Irish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Irish')
  })

  it('selected language changes to Italian when the Italian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Italian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Italian')
  })

  it('selected language changes to Latvian when the Latvian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Latvian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Latvian')
  })

  it('selected language changes to Lithuanian when the Lithuanian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Lithuanian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Lithuanian')
  })

  it('selected language changes to Maltese when the Maltese option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Maltese').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Maltese')
  })

  it('selected language changes to Polish when the Polish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Polish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Polish')
  })

  it('selected language changes to Portuguese when the Portuguese option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Portuguese').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Portuguese')
  })

  it('selected language changes to Romanian when the Romanian option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Romanian').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Romanian')
  })

  it('selected language changes to Slovak when the Slovak option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Slovak').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Slovak')
  })

  it('selected language changes to Slovene when the Slovene option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Slovene').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Slovene')
  })

  it('selected language changes to Spanish when the Spanish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Spanish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Spanish')
  })

  it('selected language changes to Swedish when the Swedish option is selected', () => {
   //Act
   cy.get('#languages').click()
   cy.get('#Swedish').click()

   //Assert
   cy.get('#selected-language').should('have.text', 'Swedish')
  })
 })


 context('Profile Dropdown', () => {
  it('shows sign out when the profile dropdown is clicked', () => {
   //Act
   cy.get('#profile').click()

   //Assert
   cy.get('#profile ul li').should('have.text', 'Sign Out')
  })
 })


 context('Currency Dropdown', () => {
  it('shows 6 currencies when the currency dropdown is clicked', () => {
   //Act
   cy.get('#currencies').click()

   //Assert
   cy.get('#currencies ul li').should('have.length', 6)
  })

  it('cost doesnt change when NOK is selected in the currency drop down', () => {
   //Act
   cy.get('#NOK').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'NOK')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' NOK 72.94 ')
  })

  it('cost updates to 75.86 when SEK is selected in the currency drop down', () => {
   //Act
   cy.get('#currencies').click()
   cy.get('#SEK').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'SEK')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' SEK 75.86 ')
  })

  it('cost updates to 1,042 when ISK is selected in the currency drop down', () => {
   //Act
   cy.get('#currencies').click()
   cy.get('#ISK').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'ISK')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' ISK 1,042 ')
  })

  it('cost updates to 53.97 when DKK is selected in the currency drop down', () => {
   //Act
   cy.get('#currencies').click()
   cy.get('#DKK').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'DKK')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' DKK 53.97 ')
  })

  it('cost updates to 6.13 when GBP is selected in the currency drop down', () => {
   //Act
   cy.get('#currencies').click()
   cy.get('#GBP').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'GBP')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' £6.13 ')
  })

  it('cost updates to 7.29 when EUR is selected in the currency drop down', () => {
   //Act
   cy.get('#currencies').click()
   cy.get('#EUR').click()

   //Assert
   cy.get('#selected-currency').should('have.text', 'EUR')
   cy.get('#bills-table').find('tbody tr').first().get('td').eq(4).should('have.text', ' €7.29 ')
  })
 })
})
