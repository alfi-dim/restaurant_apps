import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import dataviewButtonInitiator from '../utils/dataview-button-initiator';
import DrawerInitiator from '../utils/drawer-initiator';
import renderEventInitiator from '../utils/render-event-initiator';
import SearchInitiator from '../utils/search-initiator';

class App {
  constructor({
    hamburgerButton,
    drawer,
    content,
    contentTitle,
    dataviewButton,
    skipContentAnchor,
    searchButton,
    searchValue,
  }) {
    this._hamburgerButton = hamburgerButton;
    this._drawer = drawer;
    this._content = content;
    this._contentTitle = contentTitle;
    this._dataviewButton = dataviewButton;
    this._skipContentAnchor = skipContentAnchor;
    this._searchButton = searchButton;
    this._searchValue = searchValue;

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

    SearchInitiator.init({ button: this._searchButton, searchValue: this._searchValue });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (url.includes('/search')) {
      const pageSearch = routes['/search'];
      this._content.innerHTML = await pageSearch;
      return;
    }

    if (url.includes('/detail')) {
      if (this.checkIsPageReloaded()) {
        window.location.href = '/';
      }
      const selected = this._content.firstChild.shadowRoot.host.shadowRoot.querySelector('restaurants-list').shadowRoot.activeElement.shadowRoot;
      selected.innerHTML = await page;
      return;
    }

    if (page === undefined) {
      window.location.href = '/';
      return;
    }

    this._content.innerHTML = await page;
    this._searchValue.value = '';
  }

  checkIsPageReloaded() {
    const isPageReloaded = performance.getEntriesByType('navigation')[0].type === 'reload';
    return isPageReloaded;
  }
}

export default App;
