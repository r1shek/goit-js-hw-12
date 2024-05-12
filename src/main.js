import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabayData } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const button = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('#gallery'); // Здесь определяем галерею

input.addEventListener('input', () => {
  const query = input.value.trim();
  if (query === '') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  gallery.textContent = '';

  const query = input.value.trim();

  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  fetchPixabayData(query)
    .then(data => {
      if (data.total === 0) {
        iziToast.error({
          message: 'No images found for your search query. Please try again.',
          position: 'topRight',
        });
      } else {
        renderGallery(data.hits);
        lightboxCreate();
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      iziToast.error({
        message: 'Failed to fetch data. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      input.value = '';
      button.disabled = true;
      loader.style.display = 'none';
    });
});

function lightboxCreate() {
  let lightbox = new SimpleLightbox('#gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  lightbox.refresh();
}
