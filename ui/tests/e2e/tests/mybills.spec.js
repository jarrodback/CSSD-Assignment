describe('My Bills Tests', () => {
 it('displays two rows in the bills table', () => {
  //Act
  cy.visit('/my-bills')
  
  //Assert
  cy.get('#bills-table').find('tbody tr').should('have.length', 2)
 })
 
 it('Entry Location filters the my bills table', () => {
  //Act
  cy.visit('/my-bills')
  cy.get('#bills-table').get('#entry-location-filter').type('Entry Location')
  
  //Assert
  cy.get('#bills-table').find('tbody tr').should('have.text', 'No bills match the filter.')
 })


 it('Exit Location filters the my bills table', () => {
  //Act
  cy.visit('/my-bills')
  cy.get('#bills-table').get('#exit-location-filter').type('Exit Location')

  //Assert
  cy.get('#bills-table').find('tbody tr').should('have.text', 'No bills match the filter.')
 })

 it('Car Registration Number filters the my bills table', () => {
  //Act
  cy.visit('/my-bills')
  cy.get('#bills-table').get('#car-registration-filter').type('Car Registration Number')

  //Assert
  cy.get('#bills-table').find('tbody tr').should('have.text', 'No bills match the filter.')
 })
 
 //TODO: TEST PAGINATION
})
