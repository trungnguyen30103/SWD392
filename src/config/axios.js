// config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // URL cơ bản
});

export default api;
