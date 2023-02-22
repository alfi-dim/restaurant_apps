import CONFIG from '../globals/config';
import UrlParser from '../routes/url-parser';

const RENDER_EVENT = 'render-event';
const { CUSTOM_ELEMENTS } = CONFIG;
const renderEventInitiator = {
  init({ content }) {
    document.addEventListener(RENDER_EVENT, (e) => {
      content.innerHTML = '';
      const { pages } = e.detail;
      if (pages === '/home' || pages === '/') {
        content.innerHTML = `${CUSTOM_ELEMENTS.HOME.tag}`;
        return;
      }

      if (pages === '/favorite') {
        content.innerHTML = `${CUSTOM_ELEMENTS.FAVORITE.tag}`;
      }
    });
  },

  _dispatchEvent() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: { pages: url } }));
  },
};

export default renderEventInitiator;
