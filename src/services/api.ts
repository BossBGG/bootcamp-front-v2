// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;