// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // change this to your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional timeout
});

export default axiosInstance;
