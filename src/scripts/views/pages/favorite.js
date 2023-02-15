import { LitElement, html, css } from 'lit';
import dataviewConfig from '../../data/dataview-localStorage-config';
import favoriteRestaurantDb from '../../data/favorite-restaurants-idb';
import CONFIG from '../../globals/config';

class Favorite extends LitElement {
  static properties = {
    data: { type: Object },
    dataview: { type: String },
    page: { type: String },
  };

  static styles = css`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.favorite__title{
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
a, button{
  min-width: 44px;
  min-height: 44px;
}
  `;

  async setData() {
    this.data = await favoriteRestaurantDb.getAllRestaurant();
  }

  constructor() {
    super();
    this.dataview = dataviewConfig.getConfig();
  }

  contentTitle() {
    return html`
    <section class="favorite__title">
      <h2>List of Your Selection of the Best Restaurants</h2>
      <p>You have a good taste. List of Best Restaurants below are selected by many users too</p>
    </section>
    `;
  }

  notFoundTitle() {
    return html`
    <section class="favorite__title">
      <h2>You still don't have List of Your Selection of the Best Restaurants</h2>
      <p>Click <a href="/" title="back to home page">here</a> to return to the home page</p>
    </section>
    `;
  }

  render() {
    this.page = 'Favorite';
    if (this.data) {
      if (this.data.length === 0) {
        return html`${this.notFoundTitle()}`;
      }
      return html`
      ${this.contentTitle()}
      <restaurants-list .data=${this.data} .dataSource=${this.page}></restaurants-list>`;
    }
    return html`loading`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}
const { CUSTOM_ELEMENTS } = CONFIG;
customElements.define(CUSTOM_ELEMENTS.FAVORITE.name, Favorite);
export default Favorite;
