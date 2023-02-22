import CONFIG from '../globals/config';

const { DATAVIEW_STORAGE_KEY } = CONFIG;

const dataviewConfig = {
  checkStorage() {
    if (typeof (Storage) !== 'undefined') {
      return true;
    }
    return false;
  },

  saveConfig(dataview) {
    localStorage.setItem(DATAVIEW_STORAGE_KEY, dataview);
  },

  getConfig() {
    const config = localStorage.getItem(DATAVIEW_STORAGE_KEY);
    if (config === null) {
      this.saveConfig('column');
      return this.getConfig();
    }
    return config;
  },
};

export default dataviewConfig;
