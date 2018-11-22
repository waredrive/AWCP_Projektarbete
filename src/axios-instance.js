import axios from 'axios';

// To be used with interceptors
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default instance;
