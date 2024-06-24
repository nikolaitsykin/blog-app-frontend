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
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchTags,
} from "../redux/actions/postsActions";
import { _BASE_URL } from "../utils/constants";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = React.useState(0);

  const id = useParams();
  const postFilterByTags = posts.items.filter((obj) =>
    obj.tags.includes(id.id)
  );
  const postsByTags = id.id ? postFilterByTags : posts.items ;

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = comments.status === "loading";

  const handleChange = () => {
    activeTab === 0 ? setActiveTab(1) : setActiveTab(0);
  };

  const onSortByNewest = () => {
    dispatch(fetchSortByNewest());
  };

  const onSortByPopularity = () => {
    dispatch(fetchSortByPopularity());
  };

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());
    dispatch(fetchSortByNewest());
  }, [id]);

  return (
    <>
      <Tabs
        onChange={handleChange}
        style={{ marginBottom: 15 }}
        value={activeTab}
        aria-label="basic tabs example"
      >
        <Tab onClick={onSortByNewest} label="New" />
        <Tab onClick={onSortByPopularity} label="Popular" />
      </Tabs>
      <Grid container spacing={1}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : postsByTags).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${_BASE_URL}${obj.imageUrl}` : null}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            comments={comments.items}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
