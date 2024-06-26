import axios from "../utils/axios";
import { _POSTS_ROUTE } from "../utils/constants";

export const getPost = (id) => {
  const res = axios.get(_POSTS_ROUTE`/${id}`);
  console.log(res);
  return res;
};
