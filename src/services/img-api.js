import axios from 'axios';
import { API_URL, API_KEY } from 'constans/api_options';

export async function getImages(query, page, getImagesHits, hendleError) {
  axios.defaults.baseURL = `${API_URL}`;
  try {
    const response = await axios.get(`/`, {
      params: {
        key: API_KEY,
        q: query,
        page: page,
      },
    });
    getImagesHits(response.data);
  } catch (error) {
    hendleError(error);
  }
}
