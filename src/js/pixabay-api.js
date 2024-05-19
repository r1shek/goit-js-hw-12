import axios from 'axios';

export async function fetchPixabayData(query, page = 1, perPage = 15) {
  const apiKey = '43748337-b5dbfef6f8220f61277bc8c0d';
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: perPage,
  });

  const url = `https://pixabay.com/api/?${params}`;

  try {
    const response = await axios.get(url);
    if (response.data.totalHits === 0) {
      throw new Error(
        'There are no images matching your search query. Please try again!'
      );
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
