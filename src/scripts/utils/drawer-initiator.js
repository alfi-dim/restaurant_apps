const DrawerInitiator = {
  init({
    button, drawer, content, skipContentAnchor,
  }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    skipContentAnchor.addEventListener('click', (event) => {
      this._skipToContent(event, content);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },

  _skipToContent(event, content) {
    event.preventDefault();
    content.focus();
  },
};

export default DrawerInitiator;
