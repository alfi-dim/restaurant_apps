import { LitElement, html, css } from 'lit';
import RestaurantDataSource from '../../data/restaurant-data-source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';

const { CUSTOM_ELEMENTS } = CONFIG;
class Detail extends LitElement {
  static properties = {
    data: { type: Object },
  };

  async setData() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.data = await RestaurantDataSource.getRestaurantsDataById(url.id);
  }

  static styles = css`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
  :host{
    width: auto;
    position: relative;
    height: 200px;
    background-color: red;
    padding: 5px;
  }
  `;

  render() {
    if (this.data) {
      return html`
        <restaurant-detail .data=${this.data}></restaurant-detail>
      `;
    }
    return html``;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setData();
  }
}

customElements.define(CUSTOM_ELEMENTS.DETAIL.name, Detail);
export default Detail;
