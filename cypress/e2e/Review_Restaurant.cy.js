/* eslint-disable no-undef */
describe('review restaurant feature test', () => {
  const userRandom = `user-${crypto.randomUUID().split('-')[0]}`;
  const reviewRandom = `review-${crypto.randomUUID().split('-')[0]}`;

  it('add review with value', () => {
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
      .find('#reviewButton')
      .click();

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#reviewerName')
      .type(userRandom);

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#reviewerText')
      .type(reviewRandom);

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#reviewerSubmit')
      .click();

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('.review')
      .find('.review__content')
      .last()
      .find('.review__name')
      .should('have.text', userRandom);

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('.review')
      .find('.review__content')
      .last()
      .find('.review__description')
      .should('have.text', reviewRandom);
  });

  it('add review without value', (done) => {
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
      .find('#reviewButton')
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.eq('name column and review column should not empty');
      done();
    });

    cy.get('home-content').shadow().find('restaurants-list')
      .shadow()
      .find('restaurant-item')
      .shadow()
      .find('detail-restaurant-content')
      .shadow()
      .find('restaurant-detail')
      .shadow()
      .find('#reviewerSubmit')
      .click();
  });
});
