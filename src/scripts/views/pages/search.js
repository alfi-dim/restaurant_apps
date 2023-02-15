import { LitElement, html, css } from 'lit';
import RestaurantDataSource from '../../data/restaurant-data-source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';

class Search extends LitElement {
  static properties = {
    data: { type: Object },
    page: { type: String },
    query: { type: String },
  };

  static styles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a, button{
    min-width: 44px;
    min-height: 44px;
  }
  .search__title{
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
  .waiting{
    background-color: #eee;
    padding: 5px;
    margin-top: 50px;
    text-align: center;
  }
  .waiting h2{
    width: fit-content;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: .15em solid orange; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    letter-spacing: .15em; /* Adjust as needed */
    animation: 
      typing 3.5s steps(40, end) infinite,
      cursor .75s step-end infinite;
  }

  @keyframes typing {
    0% {
      width: 20%;
    }
    20% {
      width: 30%;
    }
    100% {
      width: 30%
    }
  }

  @keyframes cursor {
    from, to { border-color: transparent }
    50% { border-color: orange; }
  }

  .data-error, .data-not_found{
    background-color: #ff5a5a;
    padding: 5px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  }
  .reload{
    border: none;
    background-color: transparent;
    text-decoration: underline;
    font-size: 14px;
    font-style: italic;
    align-self: flex-start;
    min-width: 44px;
    min-height: 44px;
  }
  `;

  async setData() {
    this.query = UrlParser.parseSearchQuery();
    this.data = await RestaurantDataSource.searchRestaurants(this.query);
    this.page = `search?${this.query}`;
  }

  contentTitle() {
    return html`
    <section class="search__title">
      <h2>Search result for '${this.query}'</h2>
      <p>found ${this.data.founded} restaurant(s)</p>
    </section>
    `;
  }

  render() {
    if (!this.data) {
      return html`
      <div class="waiting">
        <h2> Loading data... </h2>
      </div>
      `;
    }
    if (this.data.error) {
      return html`
        <div class="data-error">
          <h2> Loading data error: ${this.data.message}</h2>
          <button class="reload" @click="${this._reloadHandler}">Try reload page</button>
        </div>
        `;
    }
    if (this.data.founded === 0) {
      return html`
        <div class="data-not_found">
            <h2> Restaurant Not Found</h2>
            <button class="back" @click="">Back to homepage</button>
        </div>
      `;
    }
    return html`
    ${this.contentTitle()}
    <restaurants-list .data=${this.data} .dataSource=${this.page}></restaurants-list>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}

const { CUSTOM_ELEMENTS } = CONFIG;
customElements.define(CUSTOM_ELEMENTS.SEARCH.name, Search);
export default Search;
