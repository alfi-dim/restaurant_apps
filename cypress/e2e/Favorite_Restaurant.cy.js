/* eslint-disable camelcase */
/* eslint-disable no-undef */
describe('favorite restaurant feature test', () => {
  it('showing empty favorite restaurant', () => {
    cy.visit('/#/favorite');
    cy.get('favorite-content').shadow().children('restaurants-list').should('not.exist');
  });

  it('Favoriting one restaurant', () => {
    cy.visit('/');
    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('a')
      .first()
      .click({ position: 'top' })
      .invoke('text')
      .as('title_1');
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

    cy.visit('/#/favorite');

    cy.get('favorite-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-favorite')
      .shadow()
      .find('a')
      .invoke('text')
      .as('title_2');

    cy.get('@title_1').then((title_1) => {
      cy.get('@title_2').then((title_2) => {
        expect(title_1).to.equal(title_2);
      });
    });
  });

  it('Unfavoriting one restaurant', () => {
    cy.visit('/');
    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('a')
      .first()
      .click({ position: 'top' })
      .invoke('text')
      .as('title_1');
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

    cy.visit('/#/favorite');

    cy.get('favorite-content').shadow().children('restaurants-list').should('not.exist');
  });
});
