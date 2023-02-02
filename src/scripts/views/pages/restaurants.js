/* eslint-disable class-methods-use-this */
import { LitElement, html, css } from 'lit';
import dataviewConfig from '../../data/dataview-localStorage-config';

const dataJson = require('../../data/DATA.json');

class RestaurantsList extends LitElement {
  static properties = {
    data: { type: Object },
    dataview: { type: String },
  };

  static styles = css`
  :host{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 0 auto auto -32px;
    text-align: left;
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
    this.data = dataJson;
    this.dataview = dataviewConfig.getConfig();
  }

  render() {
    const _dataview = this.dataview;
    return html`${this.data.restaurants.map((i) => html`<restaurant-item .data=${i} .dataview=${_dataview}></restaurant-item>`)}`;
  }
}

customElements.define('restaurants-list', RestaurantsList);

export default RestaurantsList;
