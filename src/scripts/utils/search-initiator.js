const SearchInitiator = {
  init({ button, searchValue }) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      this._renderSearch(searchValue.value);
    });
  },

  _renderSearch(value) {
    if (value === '') {
      alert('search query should not empty');
      return;
    }
    document.location.href = `/#/search?q=${value}`;
  },

};

export default SearchInitiator;
