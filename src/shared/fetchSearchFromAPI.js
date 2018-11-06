import axios from '../axios-settings';

export const fetchSearchFromAPI = query =>
  axios
    .get(
      `search/multi?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${query}&include_adult=false`
    )
    .then(response => response.data);

export default fetchSearchFromAPI;
