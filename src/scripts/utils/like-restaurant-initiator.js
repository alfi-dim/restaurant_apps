import favoriteRestaurantDb from '../data/favorite-restaurants-idb';

const LikeRestaurantInitiator = {
  async _isRestaurantExist(id) {
    if (!id) {
      return;
    }
    const restaurant = await favoriteRestaurantDb.getRestaurant(id);
    // eslint-disable-next-line consistent-return
    return !!restaurant;
  },

  async _addToFavorite(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (restaurant.hasOwnProperty('id') === undefined || restaurant.id === undefined) {
      return;
    }
    await favoriteRestaurantDb.putRestaurant(restaurant);
  },

  async _deleteFromFavorite(id) {
    await favoriteRestaurantDb.deleteRestaurant(id);
  },
};

export default LikeRestaurantInitiator;
