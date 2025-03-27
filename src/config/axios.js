import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // không có "/api" ở đây 
});

export default api;
