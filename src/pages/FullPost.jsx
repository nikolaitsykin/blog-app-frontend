import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { Post } from "../components/Post";
import { _BASE_URL } from "../utils/constants";
import { getPosts } from "../utils/heplers";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const isImage = data?.imageUrl ? `${_BASE_URL}${data.imageUrl}` : null;

  useEffect(() => {
    getPosts(id)
      .then((res) => {
        setData(res);
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
        imageUrl={isImage}
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
