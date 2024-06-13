import axios from "axios";
import { _BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: _BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default instance;
