import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import axios from "../utils/axios";
import { _BASE_URL, _POSTS_ROUTE } from "../utils/constants";

export const FullPost = React.memo(({ id }) => {
  const [post, setPost] = React.useState();
  const [comments, setComments] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const isImage = post?.imageUrl ? `${_BASE_URL}${post.imageUrl}` : null;

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${_POSTS_ROUTE}/${id}`);
        setPost(data);
        setComments(data.comments);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Error getting article");
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        key={post._id}
        id={post._id}
        title={post.title}
        imageUrl={isImage}
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.comments.length}
        tags={post.tags}
        isEditable
        isFullPost
      >
        <p>{post.text}</p>
      </Post>
      <CommentsBlock
        data={post}
        comments={comments}
        setComments={setComments}
        isLoading={false}
        authorId={post.user._id}
      >
        <AddComment
          id={post._id}
          data={post}
          comments={comments}
          setComments={setComments}
        />
      </CommentsBlock>
    </>
  );
});
