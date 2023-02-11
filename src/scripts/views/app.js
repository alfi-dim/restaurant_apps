import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import dataviewButtonInitiator from '../utils/dataview-button-initiator';
import DrawerInitiator from '../utils/drawer-initiator';
import renderEventInitiator from '../utils/render-event-initiator';

class App {
  constructor({
    hamburgerButton, drawer, content, contentTitle, dataviewButton, skipContentAnchor,
  }) {
    this._hamburgerButton = hamburgerButton;
    this._drawer = drawer;
    this._content = content;
    this._contentTitle = contentTitle;
    this._dataviewButton = dataviewButton;
    this._skipContentAnchor = skipContentAnchor;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._hamburgerButton,
      drawer: this._drawer,
      content: this._content,
      skipContentAnchor: this._skipContentAnchor,
    });
    dataviewButtonInitiator.init({
      button: this._dataviewButton,
    });
    dataviewButtonInitiator._setActiveButtonByInitialConfig();
    renderEventInitiator.init({ content: this._content });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (url.includes('/detail')) {
      if (performance.getEntriesByType('navigation')[0].type === 'reload') {
        window.location.href = '/';
      }
      const selected = this._content.firstChild.shadowRoot.host.shadowRoot.querySelector('restaurants-list').shadowRoot.activeElement.shadowRoot;
      selected.innerHTML = await page;
      return;
    }
    this._content.innerHTML = await page;
  }
}

export default App;
