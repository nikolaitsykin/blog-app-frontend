import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentsBlock } from '../components/CommentsBlock';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import {
  fetchComments,
  fetchPosts,
  fetchSortByNewest,
  fetchSortByPopularity,
  fetchTags,
} from '../redux/actions/postsActions';
import { _BASE_URL } from '../utils/constants';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [activeTab, setActiveTab] = React.useState(0);
  const [tagList, setTagList] = React.useState([]);

  const tag = useParams();
  const postsByTag = tag.id
    ? posts.items.filter((obj) => obj.tags.includes(tag.id))
    : posts.items;

  const commentsInPostsByTag = postsByTag.map((obj) => obj.comments).flat();

  const isLoadingPosts = posts.status === 'loading';
  const isLoadingTags = tags.status === 'loading';
  const isLoadingComments = comments.status === 'loading';

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
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
  }, []);

  useEffect(() => {
    const allTags = posts.items.flatMap((post) => post.tags);
    const uniqueTags = [...new Set(allTags)];
    setTagList(uniqueTags);
  }, [posts.items]);

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
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tagList} isLoading={isLoadingTags} />
          <CommentsBlock
            comments={commentsInPostsByTag}
            isLoading={isLoadingComments}
          />
        </Grid>
      </Grid>
    </>
  );
};
