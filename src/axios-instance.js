import axios from 'axios';

// To be used with interceptors and in reducers
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default instance;
