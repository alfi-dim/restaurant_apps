self.addEventListener('install', () => {
  console.log('service worker: installed');
  self.skipWaiting();
});

self.addEventListener('push', () => {
  console.log('service worker: pushed');
});

self.addEventListener('fetch', () => {
});
