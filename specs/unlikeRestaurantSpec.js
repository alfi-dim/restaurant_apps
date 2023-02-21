/* eslint-disable no-undef */
import favoriteRestaurantDb from '../src/scripts/data/favorite-restaurants-idb';
import * as TestFactories from './helper/testFactories';

describe('Unliking A Movie', () => {
  const addLikeContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer">like</div>';
  };

  beforeEach(async () => {
    addLikeContainer();
    await favoriteRestaurantDb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await favoriteRestaurantDb.deleteRestaurant(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await TestFactories.checkIsRestaurantFavorited({ id: 1 });

    expect(document.querySelector('[aria-label="delete this restaurant from favorite"]')).toBeTruthy();
  });

  it('should not display like widkget when the restaurant has been liked', async () => {
    await TestFactories.checkIsRestaurantFavorited({ id: 1 });

    expect(document.querySelector('[aria-label="add this restaurant to favorite"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant movie from the list', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    document.querySelector('[aria-label="delete this restaurant from favorite"]').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurantDb.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant movie is not in the list', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    await favoriteRestaurantDb.deleteRestaurant(1);

    document.querySelector('[aria-label="delete this restaurant from favorite"]').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurantDb.getAllRestaurant()).toEqual([]);
  });
});
