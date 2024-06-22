import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import axios from "../utils/axios";
import { _BASE_URL, _POSTS_ROUTE } from "../utils/constants";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = React.useState("");
  const { id } = useParams();
  const isImage = data?.imageUrl ? `${_BASE_URL}${data.imageUrl}` : null;

  useEffect(() => {
    axios
      .get(`${_POSTS_ROUTE}/${id}`)
      .then((res) => {
        setData(res.data);
        setComments(res.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        alert("Error getting article");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        key={data._id}
        id={data._id}
        title={data.title}
        imageUrl={isImage}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isEditable
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        data={data}
        comments={comments}
        setComments={setComments}
        isLoading={false}
        authorId={data.user._id}
      >
        <AddComment
          id={data._id}
          data={data}
          comments={comments}
          setComments={setComments}
        />
      </CommentsBlock>
    </>
  );
};
