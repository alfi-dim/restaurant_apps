import LikeRestaurantInitiator from '../../src/scripts/utils/like-restaurant-initiator';

const checkIsRestaurantFavorited = async ({ id }) => {
  const isRestaurantFavorited = await LikeRestaurantInitiator._isRestaurantExist(id);
  const likeButtonContainer = document.querySelector('#likeButtonContainer');
  if (!isRestaurantFavorited) {
    likeButtonContainer.innerHTML = '<button id="likeButton" class="like" aria-label="add this restaurant to favorite"></button>';
    return;
  }
  likeButtonContainer.innerHTML = '<button id="likeButton" class="liked" aria-label="delete this restaurant from favorite"></button>';
};

const deleteRestaurantFromFavorite = async ({ id }) => {
  await LikeRestaurantInitiator._deleteFromFavorite(id);
};

const clickLikeButton = async ({ id }) => {
  await checkIsRestaurantFavorited({ id });
  document.querySelector('#likeButton').addEventListener('click', async (e) => {
    const classTarget = e.target.className;

    if (classTarget === 'liked') {
      await LikeRestaurantInitiator._deleteFromFavorite(id);
      return;
    }
    await LikeRestaurantInitiator._addToFavorite({ id });
  });
};

export { checkIsRestaurantFavorited, clickLikeButton, deleteRestaurantFromFavorite };
