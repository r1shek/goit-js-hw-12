import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabayData } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const button = form.querySelector('button[type="submit"]');
const gallery = document.querySelector('#gallery');
const loadMoreButton = document.querySelector('#load-more');
const loader = document.getElementById('loader');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedHits = 0;

input.addEventListener('input', () => {
  const query = input.value.trim();
  button.disabled = query === '';
});

form.addEventListener('submit', async event => {
  event.preventDefault();

  gallery.textContent = '';
  currentQuery = input.value.trim();
  currentPage = 1;
  totalHits = 0;
  loadedHits = 0;
  loadMoreButton.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await fetchPixabayData(currentQuery, currentPage);
    totalHits = data.totalHits;
    loadedHits = data.hits.length;

    if (totalHits === 0) {
      iziToast.error({
        message: 'No images found for your search query. Please try again.',
        position: 'topRight',
      });
    } else {
      renderGallery(data.hits);

      lightboxCreate();

      if (loadedHits < totalHits) {
        loadMoreButton.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch data. Please try again later.',
      position: 'topRight',
    });
  } finally {
    input.value = '';
    button.disabled = true;
    loader.style.display = 'none';
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchPixabayData(currentQuery, currentPage);
    renderGallery(data.hits);
    lightboxCreate();

    loadedHits += data.hits.length;
    if (loadedHits >= totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: 'Failed to fetch data. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
});

function lightboxCreate() {
  const lightbox = new SimpleLightbox('#gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.image-card')
    .getBoundingClientRect();
  console.log(cardHeight);

  window.scrollBy({
    top: Math.round(cardHeight) * 2,
    behavior: 'smooth',
  });
}
//test
