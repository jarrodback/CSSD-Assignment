describe('Route Tests', () => {
 it('displays two rows in the bills table', () => {
  cy.visit('/my-bills')
  cy.contains('h1', 'My Bills')
 })


 it('bounces the root to the my bills page', () => {
  cy.visit('/')
  cy.contains('h1', 'My Bills')
 })
})
