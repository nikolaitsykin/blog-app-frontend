import axios from 'axios';
import { _BASE_URL } from './constants';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
