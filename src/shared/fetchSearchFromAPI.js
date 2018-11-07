import axios from '../axios-settings';

export const fetchSearchFromAPI = (query, page = 1) =>
  axios
    .get(
      `search/multi?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${query}&language=en-US&page=${page}&include_adult=false`
    )
    .then(response => response.data);

export default fetchSearchFromAPI;
