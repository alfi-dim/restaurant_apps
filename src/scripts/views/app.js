import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import dataviewButtonInitiator from '../utils/dataview-button-initiator';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({
    hamburgerButton, drawer, content, dataviewButton,
  }) {
    this._hamburgerButton = hamburgerButton;
    this._drawer = drawer;
    this._content = content;
    this._dataviewButton = dataviewButton;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._hamburgerButton,
      drawer: this._drawer,
      content: this._content,
    });
    dataviewButtonInitiator.init({
      button: this._dataviewButton,
    });
    dataviewButtonInitiator._setActiveButtonByInitialConfig();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    console.log(url);
    this._content.innerHTML = await page;
  }
}

export default App;
