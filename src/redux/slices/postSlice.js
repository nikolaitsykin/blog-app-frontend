import { createSlice } from "@reduxjs/toolkit";
import {
  fetchComments,
  fetchPosts,
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchTags,
} from "../actions/postsActions";

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.posts.items = payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = "error";
      })
      .addCase(fetchSortByNewest.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchSortByNewest.fulfilled, (state) => {
        state.posts.items = state.posts.items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        state.posts.status = "loaded";
      })
      .addCase(fetchSortByNewest.rejected, (state) => {
        state.posts.status = "error";
      })
      .addCase(fetchSortByPopularity.pending, (state) => {
        state.posts.status = "loading";
      })
      .addCase(fetchSortByPopularity.fulfilled, (state) => {
        state.posts.items = state.posts.items.sort(
          (a, b) => b.viewsCount - a.viewsCount
        );
        state.posts.status = "loaded";
      })
      .addCase(fetchSortByPopularity.rejected, (state) => {
        state.posts.status = "error";
      })
      .addCase(fetchTags.pending, (state) => {
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, { payload }) => {
        state.tags.items = payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.status = "error";
      })
      .addCase(fetchComments.pending, (state) => {
        state.comments.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, { payload }) => {
        state.comments.items = payload;
        state.comments.status = "loaded";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.comments.status = "error";
      });
  },
});

export const postsReducer = postSlice.reducer;
