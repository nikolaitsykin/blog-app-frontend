import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import {
  fetchComments,
  fetchPosts,
  fetchRemovePost,
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchTags,
} from "../redux/actions/postsActions";
import { _BASE_URL } from "../utils/constants";

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = React.useState(0);

  const tag = useParams();
  const postsByTag = tag.id ? posts.items.filter((obj) => obj.tags.includes(tag.id)) : posts.items;

  const isLoadingPosts = posts.status === "loading";
  const isLoadingTags = tags.status === "loading";
  const isLoadingComments = comments.status === "loading";

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const onSortByNewest = () => {
    dispatch(fetchSortByNewest());
  };

  const onSortByPopularity = () => {
    dispatch(fetchSortByPopularity());
  };

  const onRemovePost = (postId) => {
    if (window.confirm("Do you really want to delete this post?")) {
      dispatch(fetchRemovePost(postId));
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    dispatch(fetchSortByNewest());
  }, [dispatch]);

  return (
    <>
      <Tabs
        onChange={handleTabChange}
        value={activeTab}
        aria-label="basic tabs example"
      >
        <Tab onClick={onSortByNewest} label="New" />
        <Tab onClick={onSortByPopularity} label="Popular" />
      </Tabs>
      <Grid container spacing={1}>
        <Grid xs={8} item>
          {postsByTag.map((post, index) =>
            isLoadingPosts ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${_BASE_URL}${post.imageUrl}` : null}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={post.comments.length}
                tags={post.tags}
                isEditable={user?._id === post.user._id}
                onRemovePost={onRemovePost}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
          <CommentsBlock comments={comments.items} isLoading={isLoadingComments} />
        </Grid>
      </Grid>
    </>
  );
};
