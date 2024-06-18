import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { _POSTS_ROUTE, _TAGS_ROUTE } from "../../utils/constants";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get(_POSTS_ROUTE);
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get(_TAGS_ROUTE);
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`${_POSTS_ROUTE}/${id}`);
  }
);
