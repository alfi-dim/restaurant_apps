import { LitElement, html, css } from 'lit';

class RestaurantItem extends LitElement {
  static properties = {
    data: { type: Object },
    dataview: { type: String },
    targetId: { type: String },
  };

  static styles = [
    css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  img {
    display: block;
  }
  .posts-column-item{
    margin-top: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  
  /* post column style */
  .post-column-thumbnail{
    width: 100%;
    min-height: 200px;
    padding: 5px;
    background-position: center;
  }
  .post-column-thumbnail__rating{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 3px 5px;
    border-radius: 100px;
    justify-content: center;
    width: -moz-fit-content;
    width: fit-content;
  }
  .post-column-thumbnail__rating-value{
    text-align: center;
  }
  .post-column-thumbnail__rating-icon{
    width: 24px;
    margin: auto;
  }
  .post-column-content{
    padding: 16px 32px 32px 32px;
  }
  .post-column-content__title{
    font-size: 24px;
    margin-top: 16px;
    transition: 0.3s opacity;
  }
  .post-column-content__description{
    margin-top: 16px;
    font-size: 14px;
    line-height: 1.5em;
  }
  .post-column-content__city{
    margin-top: 16px;
    font-size: 18px;
    font-weight: 1000;
    line-height: 1.5em;
  }
  `,
    css`
  .posts-list-item{
    margin: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    width: 100%;
    border-radius: 5px;
    max-height: 380px;
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(1, 1fr 3fr);
    gap: 5px;
    overflow: auto;
  }
  
  
  .post-list-thumbnail{
    max-width: 120px;
  }
  
  .post-list-content{
    width: 100%;
    padding: 5px;
  }
  .post-list-content__title{
    padding-top: 5px;
    font-size: 1em;
  }
  .post-list-content__rating{
    font-size: 0.8em;
  }
  .post-list-content__description{
    font-size: 0.6em;
  }
  .post-list-content__city{
    padding-top: 5px;
    font-weight: 800;
    font-size: 0.8em;
  }
  
  .readmore-button{
    background-color: transparent;
    border: none;
    text-decoration: underline;
    color: blue;
    font-size: 0.9em;
    cursor: pointer;
    min-width: 44px;
    min-height: 44px;
  }
  
  @media screen and (min-width: 500px) {
    .post-list-thumbnail{
        max-width: 200px;
    }
    .post-list-content__title{
        font-size: 1.5em;
    }
    .post-list-content__rating{
        font-size: 1.2em;
    }
    .post-list-content__description{
        font-size: 1em;
    }
    .post-list-content__city{
        font-size: 1.2em;
    }
  }

  @media screen and (min-width: 700px){
    .post-list-thumbnail{
        max-width: 200px;
    }
    .post-list-content__title{
        font-size: 1.5em;
    }
    .post-list-content__rating{
        font-size: 1.2em;
    }
    .post-list-content__description{
        font-size: 1.2em;
    }
    .post-list-content__city{
        font-size: 1.2em;
    }
  }
  @media screen and (min-width: 800px) {
    .post-list-thumbnail{
        max-width: 250px;
    }
    .post-list-content__title{
        font-size: 1.6em;
    }
    .post-list-content__rating{
        font-size: 1.3em;
    }
    .post-list-content__description{
        font-size: 1.4em;
    }
    .post-list-content__city{
        font-size: 1.3em;
    }
  }
    `];

  render() {
    if (this.dataview === 'column') {
      return this._columnItem(this.data);
    }
    if (this.dataview === 'list') {
      return this._listItem(this.data);
    }

    return html``;
  }

  _columnItem = (data) => html`
  <article class="posts-column-item" id="${data.id}">
    <div class="post-column-thumbnail" style="background-image: url(${data.pictureId});">
        <div class="post-column-thumbnail__rating">
            <h2 class="post-column-thumbnail__rating-value">${data.rating}</h2>
            <img src="./images/icons/rating.svg" alt="Rating Icon" class="post-column-thumbnail__rating-icon">
        </div>
    </div>
    <div class="post-column-content">
        <h2 class="post-column-content__title">${data.name}</h2>
        <p class="post-column-content__description">${data.description}</p>
        <p class="post-column-content__city">Lokasi: ${data.city}</p>
    </div>
  </article>`;

  _listItem = (data) => {
    const isDescriptionLengthMoreThan120 = data.description.length > 120;
    return html`
  <article class="posts-list-item" id="${data.id}">
      <img src="${data.pictureId}" alt="Gambar dari restoran ${data.name}" class="post-list-thumbnail">
      <div class="post-list-content">
          <p class="post-list-content__rating">rating: ${data.rating}</p>
          <p class="post-list-content__city">Lokasi: ${data.city}</p>
          <h2 class="post-list-content__title">${data.name}</h2>
          <p class="post-list-content__description">${isDescriptionLengthMoreThan120 ? data.description.slice(0, 129) : data.description} 
              <span id="dots-${data.id}" style="display: ${isDescriptionLengthMoreThan120 ? 'block' : 'none'}">...</span>
              <span id="full-${data.id}" style="display: none;">${this.data.description}</span>
              <br>
              <button id="read-${data.id}" @click="${this._readMoreHandler}" class="readmore-button" style="display: ${isDescriptionLengthMoreThan120 ? 'block' : 'none'}">Read more</button>
          </p>
      </div>
  </article>`;
  };

  _readMoreHandler = (e) => {
    [, this.targetId] = e.target.id.split('-');
    const buttonElement = this.shadowRoot.getElementById(`read-${this.targetId}`);
    const fullDescriptionElement = this.shadowRoot.getElementById(`full-${this.targetId}`);
    const dotsElement = this.shadowRoot.getElementById(`dots-${this.targetId}`);
    if (fullDescriptionElement.style.display === 'none') {
      buttonElement.innerText = 'Read less';
      fullDescriptionElement.style.display = 'inline';
      dotsElement.style.display = 'none';
    } else {
      buttonElement.innerText = 'Read more';
      fullDescriptionElement.style.display = 'none';
      dotsElement.style.display = 'inline';
    }
  };
}

customElements.define('restaurant-item', RestaurantItem);

export default RestaurantItem;
