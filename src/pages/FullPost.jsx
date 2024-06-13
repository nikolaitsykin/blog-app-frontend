import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { _POSTS_ROUTE } from "../utils/constants";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${_POSTS_ROUTE}/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
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
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              name: "Jack Russel",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Test comment number 1",
          },
          {
            user: {
              name: "Doberman Pincher",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
