import CONFIG from '../globals/config';

const routes = {
  '/': CONFIG.CUSTOM_ELEMENTS.HOME.tag,
  '/home': CONFIG.CUSTOM_ELEMENTS.HOME.tag,
  '/detail/:id': CONFIG.CUSTOM_ELEMENTS.DETAIL.tag,
  '/favorite': CONFIG.CUSTOM_ELEMENTS.FAVORITE.tag,
};
export default routes;
