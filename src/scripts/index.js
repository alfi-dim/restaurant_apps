import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import './views/templates/restaurants';
import './views/templates/restaurant-item';
import './views/pages/home';
import dataviewButtonInitiator from './utils/dataview-button-initiator';
import App from './views/app';

const app = new App({
  hamburgerButton: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#content__item'),
  dataviewButton: document.querySelectorAll('.data'),
});

window.addEventListener('load', () => {
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
