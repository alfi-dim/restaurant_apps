import dataviewConfig from '../data/dataview-localStorage-config';
import renderEventInitiator from './render-event-initiator';

const dataviewButtonInitiator = {
  init({ button }) {
    button.forEach((btn) => {
      this._dontDisplayButtonIfNotSupportStorage(btn);
      btn.addEventListener('click', (e) => {
        this._toggleActiveButton(e.target);
        this._saveDatasetValue(e.target);
      });
    });
  },

  _toggleActiveButton(target) {
    document.querySelector('.active')?.classList.remove('active');
    target.classList.add('active');
  },

  _dontDisplayButtonIfNotSupportStorage(target) {
    if (!dataviewConfig.checkStorage()) {
      target.style.display = 'none';
    }
  },

  _saveDatasetValue(target) {
    const targetDataview = target.getAttribute('data-view');
    dataviewConfig.saveConfig(targetDataview);
    renderEventInitiator._dispatchEvent();
  },

  _setActiveButtonByInitialConfig() {
    const config = dataviewConfig.getConfig();
    const initialActiveButton = document.querySelector(`[data-view="${config}"]`);
    this._toggleActiveButton(initialActiveButton);
  },
};

export default dataviewButtonInitiator;
