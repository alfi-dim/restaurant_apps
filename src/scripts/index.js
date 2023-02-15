import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import './views/templates/restaurants';
import './views/templates/restaurant-item';
import './views/templates/restaurant-item-detail';
import './views/templates/restaurant-favorite';
import './views/pages/home';
import './views/pages/detail';
import './views/pages/favorite';
import './views/pages/search';
import dataviewButtonInitiator from './utils/dataview-button-initiator';
import App from './views/app';
import RestaurantDataSource from './data/restaurant-data-source';

const app = new App({
  hamburgerButton: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#content__item'),
  dataviewButton: document.querySelectorAll('.data'),
  skipContentAnchor: document.querySelector('#skip-link'),
  searchButton: document.querySelector('#search__button'),
  searchValue: document.getElementById('search__input'),
});

window.addEventListener('load', () => {
  RestaurantDataSource.getRestaurantsData();
  app.renderPage();
});
window.addEventListener('hashchange', () => {
  app.renderPage();
});
// eslint-disable-next-line no-promise-executor-return
const sleep = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
let available = true;
window.addEventListener('resize', async () => {
  if (available === true) {
    if (window.innerWidth > 1000) {
      const columnButton = document.querySelector('[data-view="column"]');
      dataviewButtonInitiator._toggleActiveButton(columnButton);
      dataviewButtonInitiator._saveDatasetValue(columnButton);
      available = false;
      await sleep(3000);
      available = true;
    }
  }
});
