const SearchInitiator = {
  init({ button, searchValue }) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this._renderSearch(searchValue.value);
    });
  },

  _renderSearch(value) {
    document.location.href = `/#/search?q=${value}`;
  },

};

export default SearchInitiator;
