describe('Route Tests', () => {
 it('loads the my bills page', () => {
  cy.visit('/my-bills')
  cy.contains('h1', 'My Bills')
 })
 
 
 it('bounces the root to the my bills page', () => {
  cy.visit('/')
  cy.contains('h1', 'My Bills')
 })
})
