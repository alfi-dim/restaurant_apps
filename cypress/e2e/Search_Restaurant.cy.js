/* eslint-disable no-undef */
describe('search restaurant feature test', () => {
  it('search restaurant with value', () => {
    cy.visit('/');

    cy.get('.search__box')
      .find('#search__input')
      .type('kafe')
      .next()
      .click();

    cy.url().should('contains', '/search');

    cy.get('#content__item')
      .find('search-restaurant-content')
      .should('exist');

    cy.get('#content__item')
      .find('search-restaurant-content')
      .shadow()
      .find('restaurants-list')
      .should('exist');
  });

  it('search restaurant wihout value', (done) => {
    cy.visit('/');

    cy.on('window:alert', (text) => {
      expect(text).to.eq('search query should not empty');
      done();
    });

    cy.get('.search__box')
      .find('#search__button')
      .click();
  });

  it('search not found restaurant', () => {
    cy.visit('/');

    cy.get('.search__box')
      .find('#search__input')
      .type('Dimas')
      .next()
      .click();

    cy.url().should('contains', '/search');

    cy.get('#content__item')
      .find('search-restaurant-content')
      .should('exist');

    cy.get('#content__item')
      .find('search-restaurant-content')
      .shadow()
      .find('.data-not_found')
      .should('exist');
  });
});
