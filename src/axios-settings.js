import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-4685f.firebaseio.com/'
});

export default instance;
