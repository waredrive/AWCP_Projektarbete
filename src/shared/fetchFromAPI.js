// TODO: WILL BE REDUNTADT

import axios from 'axios';

export const fetchSearchesFromAPI = (query, type = 'multi', page = 1) =>
  axios
    .get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&query=${query}&language=en-US&page=${page}&include_adult=false`
    )
    .then(response => response.data);

export const fetchDetailsFromAPI = (type, id) =>
  axios
    .get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US&append_to_response=tv_credits,movie_credits,videos,external_ids,recommendations,images,credits,combined_credits`
    )
    .then(response => response.data);

export const fetchCreditsFromAPI = params =>
  axios
    .get(
      `https://api.themoviedb.org/3${params}?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&language=en-US`
    )
    .then(response => response.data);
