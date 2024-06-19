import axios from "./axios";
import { _POSTS_ROUTE } from "./constants";

export const getPosts = async (id) => {
  try {
    const { data } = await axios.get(`${_POSTS_ROUTE}/${id}`);
    return data;
  } catch (error) {
    console.warn(error);
  }
};