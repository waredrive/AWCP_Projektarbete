import axios from '../axios-settings';

export const fetchFromAPI = (query, page = 1, type = 'multi') =>
  axios
    .get(
      `search/${type}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${query}&language=en-US&page=${page}&include_adult=false`
    )
    .then(response => response.data);

export default fetchFromAPI;
