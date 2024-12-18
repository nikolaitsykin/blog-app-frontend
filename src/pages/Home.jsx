import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CommentsBlock } from '../components/CommentsBlock/CommentsBlock';
import { Post } from '../components/Post/Post';
import { TagsBlock } from '../components/TagsBlock/TagsBlock';
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
  const [activeTab, setActiveTab] = React.useState(1);

  const tag = useParams();
  const filteredPosts = tag.id
    ? posts.items.filter((obj) => obj.tags.includes(tag.id))
    : posts.items;
  const filteredComments = filteredPosts.map((obj) => obj.comments).flat();

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
    dispatch(fetchSortByPopularity());
  }, []);

  // const [tagList, setTagList] = React.useState([]);
  // useEffect(() => {
  //   const allTags = posts.items.flatMap((post) => post.tags);
  //   const uniqueTags = [...new Set(allTags)];
  //   setTagList(uniqueTags);
  // }, [posts.items]);

  return (
    <>
      <Tabs
        onChange={handleTabChange}
        value={activeTab}
        aria-label="sorting tabs"
      >
        <Tab key={0} onClick={onSortByNewest} label="New" />
        <Tab key={1} onClick={onSortByPopularity} label="Popular" />
      </Tabs>
      <Grid container spacing={1}>
        <Grid xs={12} sm={8} item>
          {filteredPosts.map((post, index) =>
            isLoadingPosts ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? _BASE_URL + post.imageUrl : null}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={post.comments.length}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
              >
                {post.text.slice(0, 100)}...
              </Post>
            )
          )}
        </Grid>
        <Grid xs={12} sm={4} item>
          <CommentsBlock
            comments={filteredComments}
            isLoading={isLoadingComments}
          />
          <TagsBlock items={tags.items} isLoading={isLoadingTags} />
        </Grid>
      </Grid>
    </>
  );
};
