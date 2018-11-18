// TODO: WILL BE REDUNTADT

import axios from 'axios';

export const fetchSearchesFromAPI = query =>
  axios
    .get(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${query}&language=en-US&page=1&include_adult=false`
    )
    .then(response => response.data);
