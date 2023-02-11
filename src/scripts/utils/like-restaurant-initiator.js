import favoriteRestaurantDb from '../data/favorite-restaurants-idb';

const LikeRestaurantInitiator = {
  async _isRestaurantExist(id) {
    const restaurant = await favoriteRestaurantDb.getRestaurant(id);
    return !!restaurant;
  },

  async _addToFavorite(id) {
    await favoriteRestaurantDb.putRestaurant(id);
  },

  async _deleteFromFavorite(id) {
    await favoriteRestaurantDb.deleteRestaurant(id);
  },
};

export default LikeRestaurantInitiator;
