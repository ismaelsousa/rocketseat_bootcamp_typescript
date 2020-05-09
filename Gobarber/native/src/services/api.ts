import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.17.224.49:3333',
});

export default api;
