import { LitElement, html, css } from 'lit';
import RestaurantDataSource from '../../data/restaurant-data-source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import LikeRestaurantInitiator from '../../utils/like-restaurant-initiator';

class RestaurantItemDetail extends LitElement {
  static properties = {
    data: { type: String },
    isFavorited: { type: Boolean },
    page: { type: String },
  };

  static styles = [
    css`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .detail{
      background-color: #F2DEBA;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      margin-top: 15px;
      border-radius: 10px;
  }
  .content{
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    max-height: 350px;
    overflow: auto;
    grid-column-start: 1;
    grid-column-end: 7;
  }
  section{
    padding: 5px;
  }
  .detail .hero{
    grid-column-start: 1;
    grid-column-end: 7;
    width: 100%;
    min-height: 250px;
    padding: 5px;
  }
  button, a{
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
  }
  .hero #closeAnchor{
    border-radius: 10px;
    border: none;
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(255, 0, 0, 0.8);
    text-align: center;
  }
  #closeAnchor img{
    width: 25px;
  }
  .description{
    grid-column-start: 2;
    grid-column-end: 7;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  .info__headline h2{
    font-size: 1em;
  }
  .hero #likeButton{
    
    background-color: rgba(255,255,255,0.8);
    border: none;
    border-radius: 10px;
  }
  .hero .like {
    background-image: url(./images/icons/heart-outline.svg);
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .hero .liked{
    background-image: url(./images/icons/heart.svg);
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .info .info__utils{
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  }
  .info__utils p{
    font-size: 0.8em
  }
 
  .rating{
    grid-row-start: 2;
    grid-row-end: 3;
    display: grid;
    text-align: center;
    height: fit-content;
  }
  
  .rating__icon img{
    width: 20px;
  }
  .score{
      font-size: 1em
  }
  .summary{
      font-size: 0.6em;
  }
  .rating #reviewButton{
      background-color: transparent;
      border: none;
      font-size: 0.8em;
  }
  .review__icon{
    width: 15px;
  }
  .service{
    display: grid;
    grid-template-rows: repeat(1, 1fr);
    padding: 5px;
    gap: 10px;
    grid-column-start: 1;
    grid-column-end: 8;
  }
  .service .service__category{
    height: fit-content;
  }
  .service .service__menu .menu{
    gap: 5px;
    width: 100%;
  }
  .review{
    border-top: 2px solid white;
    margin-top: 10px;
    grid-column-start: 1;
    grid-column-end: 8;
    padding: 5px;
  }

  .review__content{
      background-color: #FFFBE9;
      padding: 5px;
      margin-bottom: 10px;
  }
  .review__content .review__name{
      border-bottom:1px solid #dcb96e;
  }
  .review__content .review__date{
      color: grey;
      font-size: 0.8em;
  }
  ul{
      list-style-type: none;
  }
  .menu li ul li::before{
      content: '';
      border-left: 1px dashed black;
      padding-left: 0.7em;
  }
  .menu li ul li{
      display: flex;
  }

  .detail .review__form{
    grid-column-start: 1;
    grid-column-end: 8;
    padding: 5px;
    width: 100%;
    background:#DAE2B6;
    border-radius:2px;
  }
  .review__form h4{
      display: block;
      padding: 5px;
      margin: 0px 0px 20px 0px;
      color: #272626;
  }
  .review__form ul{
      list-style:none;
      padding:0;
      margin:0;
  }
  .review__form li{
      display: block;
      padding: 9px;
      border:3px solid #CCD6A6;
      margin-bottom: 30px;
      border-radius: 3px;
  }
  .review__form li:last-child{
      border:none;
      margin-top: -20px;
  }
  .review__form li > label{
      display: block;
      float: left;
      margin-top: -20px;
      background: #CCD6A6;
      height: 14px;
      padding: 0px 10px;
      border-radius: 5px;
      color: black;
      font-size: 14px;
      overflow: hidden;
      font-family: Arial, Helvetica, sans-serif;
  }

  .review__form input[type="text"],
  .review__form textarea
  {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      width: 100%;
      background-color: #DAE2B6;
      display: block;
      outline: none;
      border: none;
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      padding: 0;
  }
  .review__form li > span{
      background: #CCD6A6;
      display: block;
      padding: 3px;
      margin: 0 -9px -9px -9px;
      color: #5C5C5C;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11px;
  }
  .review__form textarea{
      resize:none;
  }
  .review__form input[type="submit"]{
      background: #FAAB78;
      border: none;
      padding: 10px 20px;
      border-bottom: 3px solid #FFDCA9;
      border-radius: 3px;
      color: black;
      cursor: pointer;
  }
  .review__form input[type="submit"]:hover{
      background: #FEBE8C;
      color:black;
  }
  .open{
    display: block;
  }
  .closed{
    display: none;
  }
  `,
    css`
  @media screen and (min-width: 450px){
    .service .service__menu .menu{
      display: grid;
      grid-template-columns: repeat(1, 1fr 2fr);
      gap: 5px;
      width: 100%;
    }
  }

  @media screen and (min-width: 500px){
    ul li ul:nth-child(2) {
      -webkit-columns:2;
      -moz-columns:2;
      columns:2;
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
    }
  }
  @media screen and (min-width: 650px) and (max-width: 1000px) {
    .description{
      grid-column-start: 2;
      grid-column-end: 7;
      grid-row-start: 1;
      grid-row-end: 3;
    }
    .rating{
      grid-row-start: 1;
      grid-row-end: 3;
      display: grid;
      grid-column-start: 7;
      padding-top: 20px;
      text-align: center;
      grid-template-rows: repeat(1, 2fr 1fr 2fr);
    }
    .rating__icon img{
      width: 80px;
    }
    .score{
      font-size: 2em
    }
    .summary{
        font-size: 1em;
    }
    .rating #reviewButton{
      background-color: transparent;
      border: none;
      font-size: 1em;
    }
    .info{
      display: grid;
      grid-template-rows: repeat(2, 1fr);
    }
    ul li ul:nth-child(2) {
      -webkit-columns:3;
      -moz-columns:3;
      columns:3;
      -moz-column-count: 3;
      -webkit-column-count: 3;
      column-count: 3;
    }
  }

  @media screen and (min-width: 800px) {
    ul li ul:nth-child(2) {
      -webkit-columns:4;
      -moz-columns:4;
      columns:4;
      -moz-column-count: 4;
      -webkit-column-count: 4;
      column-count: 4;
    }
  }

  @media screen and (min-width: 1000px) {
    ul li ul:nth-child(2) {
      -webkit-columns:2;
      -moz-columns:2;
      columns:2;
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
    }
    .service .service__menu .menu{
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 5px;
      width: 100%;
    }
  }
    
  `];

  render() {
    this.page = UrlParser.parsePageQuery();
    const { restaurant } = this.data;
    return html`
        ${this._detailRestaurantTemplate(restaurant)}
        `;
  }

  _detailRestaurantTemplate(restaurant) {
    return html`
    <article class="detail" id="detail-${restaurant.id}">
      <div class="hero" style="background-image: url(${CONFIG.BASE_IMAGE_URL.medium}/${restaurant.pictureId});position: sticky;">
        ${this.renderFavoriteButton()}
        <a id="closeAnchor" aria-label="close detail restaurant" @click="${this._closeDetail}"><img src="/images/icons/xmark.svg"></a>
      </div>
      <section class="content">
        <section class="info">
          <span class="info__headline">
              <h2>${restaurant.name}</h2>
          </span>
          <span class="info__utils">
              <p>${restaurant.address}</p>
              <p>${restaurant.city}</p>
          </span>
        </section>
        <section class="service">
          <span class="service__category">
            <h4>Category: </h4>
            <p>${this._splitCategories(restaurant.categories)}</p>
          </span>
          <span class="service__menu">
            <h4>Menu</h4>
            <ul class="menu">
                <li> <h4> Makanan </h4>
                    <ul>
                        ${restaurant.menus.foods.map((food) => html`<li><p>${food.name}</p></li>`)}
                    </ul>
                </li>
                <li>
                    <h4> Minuman </h4> 
                    <ul>
                        ${restaurant.menus.drinks.map((drink) => html`<li><p>${drink.name}</p></li>`)}
                    </ul>
                </li>
            </ul>
          </span>
        </section>
        <section class="description">
            <p>${restaurant.description}</p>
        </section>
        <section class="rating">
            <span class="rating__icon">
              <img src="./images/icons/star.svg" alt="rating icon">
            </span>
            <span class="rating__score">
              <p class="score">${restaurant.rating}*</p>
              <p class="summary">*from ${restaurant.customerReviews.length} review(s)</p>
            </span>
            <span class="rating__button">
              <button id="reviewButton" aria-label="review this restaurant" @click=${this._displayAddReviewForm}>add review <img src="./images/icons/add-review.svg" class="review__icon"></button>
            </span>
        </section>
        <section class="review">
            ${restaurant.customerReviews.map((customerReview) => html`
            <div class="review__content">
              <h4 class="review__name">${customerReview.name}</h4>
              <p class="review__description">${customerReview.review}</p>
              <p class="review__date">${customerReview.date}</p>
            </div>
            `)}
        </section>
        <section class="review__form closed" id="reviewForm">
            <h4>Submit your review</h4>
            <form class="review__form">
                <ul>
                <li>
                    <label for="name">Name</label>
                    <input type="text" id="reviewerName" name="name" maxlength="100" title="Enter your full name here">
                    <span>Enter your full name here</span>
                </li>
                <li>
                    <label for="review">Your review</label>
                    <textarea name="review" id="reviewerText" title="Enter your review here"></textarea>
                    <span>Say something about your dish</span>
                </li>
                <li>
                    <input type="submit" value="Submit" @click=${this._addReview}>
                </li>
                </ul>
                </form>
        </section>
      </section>
    </article>
    `;
  }

  _splitCategories(data) {
    let categories = '';
    data.forEach((category) => {
      const index = data.indexOf(category);
      if (index !== 0 || index % 2 !== 0) {
        categories += `| ${category.name}`;
        return;
      }
      categories += `${category.name} `;
    });
    return categories;
  }

  _renderMenu = (data) => html`
      ${data.name}
    `;

  _renderReview(data) {
    return `
    <div class="review__content">
      <h4 class="review__name">${data.name}</h4>
      <p class="review__description">${data.review}</p>
      <p class="review__date">${data.date}</p>
    </div>
    `;
  }

  _closeDetail = () => {
    if (this.page === 'home') {
      window.location.href = '/#/home';
      return;
    }
    if (this.page === 'favorite') {
      window.location.href = '/#/favorite';
      return;
    }
    if (this.page.includes('search')) {
      const url = this.page.split('?');
      window.location.href = `/#/${url[0]}?q=${url[1]}`;
      return;
    }
    window.location.href = '/';
  };

  renderFavoriteButton() {
    if (this.isFavorited) {
      return html`
      <button id="likeButton" class="liked" aria-label="add this restaurant to favorite" @click="${this._addToFavoriteButton}"></button>
      `;
    }
    return html`<button id="likeButton" class="like" aria-label="add this restaurant to favorite" @click="${this._addToFavoriteButton}"></button>`;
  }

  async _isFavorited() {
    const { id } = this.data.restaurant;
    this.isFavorited = await LikeRestaurantInitiator._isRestaurantExist(id);
  }

  async _addToFavoriteButton() {
    await this._isFavorited();
    const { id } = this.data.restaurant;
    const btn = this.renderRoot.getElementById('likeButton');
    if (!this.isFavorited) {
      await LikeRestaurantInitiator._addToFavorite(this.data.restaurant);
      btn.className = 'liked';
      return;
    }
    await LikeRestaurantInitiator._deleteFromFavorite(id);
    btn.className = 'like';
  }

  _displayAddReviewForm() {
    const form = this.renderRoot.getElementById('reviewForm');
    if (form.classList.contains('closed')) {
      form.classList.remove('closed');
      form.classList.add('open');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    form.classList.remove('open');
    form.classList.add('closed');
  }

  async _addReview(e) {
    e.preventDefault();
    const { id } = this.data.restaurant;
    const name = this.renderRoot.querySelector('#reviewerName').value;
    const review = this.renderRoot.querySelector('#reviewerText').value;
    const response = await RestaurantDataSource.addRestaurantReview({ id, name, review });
    if (!response.error) {
      this.data.restaurant.customerReviews = response.customerReviews;
      this._displayAddReviewForm();
      const reviewElement = this.renderRoot.querySelector('.review');
      reviewElement.innerHTML = '';
      // eslint-disable-next-line array-callback-return
      this.data.restaurant.customerReviews.map((customerReview) => {
        reviewElement.innerHTML += this._renderReview(customerReview);
      });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._isFavorited();
  }
}
customElements.define('restaurant-detail', RestaurantItemDetail);
export default RestaurantItemDetail;
