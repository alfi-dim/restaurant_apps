const CONFIG = {
  DATAVIEW_STORAGE_KEY: 'dataview',
  DATABASE_NAME: 'favorite-restaurants-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  BASE_IMAGE_URL: {
    small: 'https://restaurant-api.dicoding.dev/images/small',
    medium: 'https://restaurant-api.dicoding.dev/images/medium',
    large: 'https://restaurant-api.dicoding.dev/images/large',
  },
  CUSTOM_ELEMENTS: {
    HOME: {
      name: 'home-content',
      tag: '<home-content></home-content>',
    },
    FAVORITE: {
      name: 'favorite-content',
      tag: '<favorite-content></favorite-content>',
    },
    DETAIL: {
      name: 'detail-restaurant-content',
      tag: '<detail-restaurant-content></detail-restaurant-content>',
    },
  },
};

export default CONFIG;
