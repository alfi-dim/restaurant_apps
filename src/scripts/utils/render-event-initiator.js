const RENDER_EVENT = 'render-event';
const renderEventInitiator = {
  init() {
    document.addEventListener(RENDER_EVENT, () => {
      const main = document.querySelector('#content__item');
      main.innerHTML = '';
      main.innerHTML = '<restaurants-list></restaurants-list>';
    });
  },

  _dispatchEvent() {
    this.init();
    document.dispatchEvent(new Event(RENDER_EVENT));
  },
};

export default renderEventInitiator;
