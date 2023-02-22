/* eslint-disable no-undef */
import favoriteRestaurantDb from '../src/scripts/data/favorite-restaurants-idb';
import * as TestFactories from './helper/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer">like</div>';
  };

  beforeEach(() => {
    addLikeContainer();
  });

  it('shoud show the like button when restaurant has not been liked before', async () => {
    await TestFactories.checkIsRestaurantFavorited({ id: 1 });

    expect(document.querySelector('[aria-label="add this restaurant to favorite"]')).toBeTruthy();
  });

  it('shoud not show the unlike button when restaurant has not been liked before', async () => {
    await TestFactories.checkIsRestaurantFavorited({ id: 1 });

    expect(document.querySelector('[aria-label="delete this restaurant from favorite"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.clickLikeButton({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await favoriteRestaurantDb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });
    await TestFactories.deleteRestaurantFromFavorite({ id: 1 });
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.clickLikeButton({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await favoriteRestaurantDb.getAllRestaurant()).toEqual([]);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.clickLikeButton({ id: 1 });

    await favoriteRestaurantDb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await favoriteRestaurantDb.getAllRestaurant()).toEqual([{ id: 1 }]);

    favoriteRestaurantDb.deleteRestaurant(1);
  });
});
