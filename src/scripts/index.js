import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import './nav';
import './views/pages/restaurants';
import './views/pages/restaurant-item';
import dataviewButtonInitiator from './utils/dataview-button-initiator';

window.addEventListener('load', () => {
  dataviewButtonInitiator.init({
    button: document.querySelectorAll('.data'),
  });
  dataviewButtonInitiator._setActiveButtonByInitialConfig();
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
