import { LitElement, html, css } from 'lit';
import CONFIG from '../../global/config';

const dataJson = require('../../data/DATA.json');

class Home extends LitElement {
  static properties = {
    data: { type: Object },
  };

  constructor() {
    super();
    this.data = dataJson;
  }

  static styles = css`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    `;

  render() {
    return html`
    <restaurants-list .data=${this.data}></restaurants-list>
    `;
  }
}
const { CUSTOM_ELEMENT } = CONFIG;
customElements.define(CUSTOM_ELEMENT.HOME.name, Home);
export default Home;
