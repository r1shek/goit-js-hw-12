export function fetchPixabayData(query) {
  const apiKey = '43748337-b5dbfef6f8220f61277bc8c0d';
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `https://pixabay.com/api/?${params}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          'There are no images matching your search query. Please try again!'
        );
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error', error);
    });
}
