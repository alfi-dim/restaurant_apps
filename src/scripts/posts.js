/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import data from '../DATA.json';

document.addEventListener('DOMContentLoaded', () => {
  const postsElement = document.getElementById('posts');
  const { restaurants } = data;
  const RENDER_EVENT = 'render-event';

  let viewSetting = 'column';
  const buttonViewElement = document.querySelectorAll('.data');
  buttonViewElement.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const anotherButton = document.querySelector('.active');
      anotherButton.classList.remove('active');
      e.target.classList.add('active');
      viewSetting = e.target.getAttribute('data-view');
      document.dispatchEvent(new CustomEvent(RENDER_EVENT, { detail: viewSetting }));
    });
  });

  const renderPostsElement = (data, viewSetting = 'column') => {
    // article element
    const articleElement = document.createElement('article');
    articleElement.setAttribute('class', `posts-${viewSetting}-item`);
    articleElement.setAttribute('id', `${data.id}`);

    // post content element
    const postContentElement = document.createElement('div');
    postContentElement.setAttribute('class', `post-${viewSetting}-content`);
    let { description } = data;

    // thumbnail
    if (viewSetting === 'column') {
      const thumbnailElement = document.createElement('div');
      thumbnailElement.setAttribute('class', `post-${viewSetting}-thumbnail`);
      thumbnailElement.style.backgroundImage = `url(${data.pictureId})`;

      const thumbnailRatingElement = document.createElement('div');
      thumbnailRatingElement.setAttribute('class', `post-${viewSetting}-thumbnail__rating`);
      const thumbnailRatingValue = document.createElement('h2');
      thumbnailRatingValue.setAttribute('class', `post-${viewSetting}-thumbnail__rating-value`);
      thumbnailRatingValue.innerText = data.rating;
      const thumbnailRatingIcon = document.createElement('img');
      thumbnailRatingIcon.setAttribute('src', './images/icons/rating.svg');
      thumbnailRatingIcon.setAttribute('alt', 'Rating Icon');
      thumbnailRatingIcon.setAttribute('class', `post-${viewSetting}-thumbnail__rating-icon`);

      thumbnailRatingElement.appendChild(thumbnailRatingValue);
      thumbnailRatingElement.appendChild(thumbnailRatingIcon);

      thumbnailElement.appendChild(thumbnailRatingElement);
      articleElement.appendChild(thumbnailElement);
    } else if (viewSetting === 'list') {
      const thumbnailElement = document.createElement('img');
      thumbnailElement.setAttribute('src', data.pictureId);
      thumbnailElement.setAttribute('alt', `Gambar dari restoran ${data.name}`);
      thumbnailElement.setAttribute('class', `post-${viewSetting}-thumbnail`);
      articleElement.appendChild(thumbnailElement);

      // rating
      const postContentRatingELement = document.createElement('p');
      postContentRatingELement.innerText = `rating: ${data.rating}`;
      postContentRatingELement.setAttribute('class', `post-${viewSetting}-content__rating`);

      postContentElement.appendChild(postContentRatingELement);

      if (data.description.length > 120) {
        description = `${data.description.slice(0, 119)} <span id="dots-${data.id}">...</span><span id="full-${data.id}" style="display: none;">${data.description.slice(120)}</span><button id="read-${data.id}" class="readmore">readmore</button>`;
      }
    }

    // content

    const postContentTitleElement = document.createElement('h2');
    postContentTitleElement.setAttribute('class', `post-${viewSetting}-content__title`);
    postContentTitleElement.innerText = data.name;

    const postContentDescElement = document.createElement('p');
    postContentDescElement.setAttribute('class', `post-${viewSetting}-content__description`);
    postContentDescElement.innerHTML = description;

    const postContentCityElement = document.createElement('p');
    postContentCityElement.setAttribute('class', `post-${viewSetting}-content__city`);
    postContentCityElement.innerText = `Lokasi: ${data.city}`;

    postContentElement.appendChild(postContentTitleElement);
    postContentElement.appendChild(postContentDescElement);
    postContentElement.appendChild(postContentCityElement);

    articleElement.appendChild(postContentElement);
    postsElement.appendChild(articleElement);
  };

  document.addEventListener(RENDER_EVENT, (data) => {
    const viewSetting = data.detail;
    postsElement.innerHTML = '';
    restaurants.forEach((data) => {
      renderPostsElement(data, viewSetting);
      if (viewSetting === 'list') {
        const buttonElement = document.getElementById(`read-${data.id}`);
        buttonElement.addEventListener('click', () => {
          const fullDescElement = document.getElementById(`full-${data.id}`);
          const dotsElement = document.getElementById(`dots-${data.id}`);
          if (fullDescElement.style.display === 'none') {
            const allFullDescElement = document.querySelectorAll(`[id^="full-"]`);
            const allDotsElement = document.querySelectorAll(`[id^="dots-"]`);
            allFullDescElement.forEach((e) => {
              e.style.display = 'none';
            });
            allDotsElement.forEach((e) => {
              e.style.display = 'inline';
            });

            fullDescElement.style.display = 'inline';
            dotsElement.style.display = 'none';
          } else {
            fullDescElement.style.display = 'none';
            dotsElement.style.display = 'inline';
          }
        });
      }
    });
  });

  document.dispatchEvent(new Event(RENDER_EVENT, { detail: viewSetting }));
});
