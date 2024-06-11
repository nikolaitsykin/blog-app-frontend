import axios from "axios";
import { _BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: _BASE_URL,
});

export default instance;
