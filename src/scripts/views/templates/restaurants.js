/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import dataviewConfig from '../../data/dataview-localStorage-config';

class RestaurantsList extends LitElement {
  static properties = {
    data: { type: Object },
    dataSource: { type: String },
    dataview: { type: String },
  };

  static styles = css`
  :host{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto auto -32px;
    text-align: left;
  }
  .loading{
    background-color: red
  }
  @media screen and (min-width: 1000px) {
    :host{
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
}
  `;

  constructor() {
    super();
    this.dataview = dataviewConfig.getConfig();
  }

  render() {
    if (this.dataSource === 'Home' || this.dataSource.includes('search')) {
      return html`${this.data.restaurants.map((i) => html`<restaurant-item .data=${i} .dataview=${this.dataview} .dataSource=${this.dataSource}></restaurant-item>`)}`;
    }
    if (this.dataSource === 'Favorite') {
      return html` ${this.data.map((i) => html`<restaurant-favorite .data=${i} .dataview=${this.dataview} .dataSource=${this.dataSource}></restaurant-favorite>`)}`;
    }
    return html``;
  }
}

customElements.define('restaurants-list', RestaurantsList);

export default RestaurantsList;
