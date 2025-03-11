// first test
describe('App.jsx', () => {
    it('Visits the app and asserts title', () => {
      cy.visit('/'); // Replace with your app's URL
      cy.get('h1').should('contain', 'Dog Picture'); // Adjust the selector and text as needed
    });
  });
  