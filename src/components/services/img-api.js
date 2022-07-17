import axios from 'axios';

export const getImages = (query, page, getImagesHits, hendleError) => {
  axios(
    `https://pixabay.com/api/?key=27671423-c69978df0ba28126a1f72b97e&q=${query}&page=${page}`
  )
    .then(response => {
      return response.data;
    })
    .then(data => {
      getImagesHits(data);
    })
    .catch(error => hendleError(error));
};
