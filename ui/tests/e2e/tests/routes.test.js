describe('Route Tests', () => {
 it('loads the my bills page', () => {
  //Act
  cy.visit('/my-bills')
  
  //Assert
  cy.contains('h1', 'My Bills')
 })
 
 
 it('bounces the root to the my bills page', () => {
  //Act
  cy.visit('/')
  
  //Assert
  cy.contains('h1', 'My Bills')
 })
})
