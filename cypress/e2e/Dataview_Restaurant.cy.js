/* eslint-disable no-undef */
describe('dataview restaurant feature test', () => {
  beforeEach(() => {
    cy.viewport('ipad-2');
  });

  describe('test dataview feature in / url', () => {
    it('change column dataview to list dataview', () => {
      cy.visit('/');

      cy.get('.posts-button')
        .find('#listButton')
        .click();

      cy.get('#content__item')
        .find('home-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('.posts-list-item')
        .should('exist');
    });

    it('change column dataview to list dataview', () => {
      cy.visit('/');

      cy.get('.posts-button')
        .find('#columnButton')
        .click();

      cy.get('#content__item')
        .find('home-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('.posts-column-item')
        .should('exist');
    });
  });

  describe('test dataview feature in /home url', () => {
    it('change column dataview to list dataview', () => {
      cy.visit('/#/home');

      cy.get('.posts-button')
        .find('#listButton')
        .click();

      cy.get('#content__item')
        .find('home-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('.posts-list-item')
        .should('exist');
    });

    it('change column dataview to list dataview', () => {
      cy.visit('/#/home');

      cy.get('.posts-button')
        .find('#columnButton')
        .click();

      cy.get('#content__item')
        .find('home-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('.posts-column-item')
        .should('exist');
    });
  });

  describe('test dataview feature in /favorite url', () => {
    it('favoriting one restaurant', () => {
      cy.visit('/');
      cy.get('home-content').shadow().find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('a')
        .first()
        .click({ position: 'top' });
      cy.url().should('contains', '/detail');

      cy.get('home-content').shadow().find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('detail-restaurant-content')
        .shadow()
        .find('restaurant-detail')
        .shadow()
        .find('#likeButton')
        .click();
    });

    it('change column dataview to list dataview', () => {
      cy.visit('/#/favorite');

      cy.get('.posts-button')
        .find('#listButton')
        .click();

      cy.get('#content__item')
        .find('favorite-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-favorite')
        .shadow()
        .find('.posts-list-item')
        .should('exist');
    });

    it('change column dataview to list dataview', () => {
      cy.visit('/#/favorite');

      cy.get('.posts-button')
        .find('#columnButton')
        .click();

      cy.get('#content__item')
        .find('favorite-content')
        .shadow()
        .find('restaurants-list')
        .shadow()
        .find('restaurant-favorite')
        .shadow()
        .find('.posts-column-item')
        .should('exist');
    });

    it('unfavorite one restaurant', () => {
      cy.visit('/');
      cy.get('home-content').shadow().find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('a')
        .first()
        .click({ position: 'top' });
      cy.url().should('contains', '/detail');

      cy.get('home-content').shadow().find('restaurants-list')
        .shadow()
        .find('restaurant-item')
        .shadow()
        .find('detail-restaurant-content')
        .shadow()
        .find('restaurant-detail')
        .shadow()
        .find('#likeButton')
        .click();
    });
  });
});
