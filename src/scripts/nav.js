document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', () => {
    const drawerElement = document.getElementById('drawer');
    if (window.scrollY !== 0) {
      drawerElement.style.position = 'fixed';
    } else {
      drawerElement.style.position = 'relative';
    }
  });

  const hamburger = document.getElementById('hamburger');
  const main = document.querySelector('main');
  const navList = document.querySelector('.nav__list');

  hamburger.addEventListener('click', (event) => {
    navList.classList.toggle('open');
    event.stopPropagation();
  });

  main.addEventListener('click', (event) => {
    navList.classList.remove('open');
    event.stopPropagation();
  });

  const skipContentElement = document.getElementById('skip-link');
  skipContentElement.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#main').focus();
  });
});
