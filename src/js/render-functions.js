export function renderGallery(images) {
  const gallery = document.querySelector('#gallery');
  const cards = images.map(image => createMarkup(image));
  gallery.insertAdjacentHTML('beforeend', cards.join(''));
}

function createMarkup(image) {
  return `
    <a href="${image.largeImageURL}" class="image-card">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="details">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </a>
  `;
}
//test
