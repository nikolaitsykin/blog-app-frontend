import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { _COMMENTS_ROUTE } from "../../utils/constants";
import styles from "./AddComment.module.scss";

export const AddComment = ({ id, data, comments, setComments }) => {
  const userData = useSelector((state) => state.auth.data);
  const [commentAdd, setCommentAdd] = React.useState("");
  const avatar = userData
    ? `${userData.avatarUrl}`
    : "../../images/no_avatar.png";

  const writeComment = (event) => {
    setCommentAdd(event.target.value);
  };

  const onSubmitComment = async () => {
    try {
      if (commentAdd) {
        const user = {
          name: userData.name,
          avatarUrl: avatar,
        };

        const fields = {
          ...data,
          comments: [
            ...comments,
            {
              user: user,
              text: commentAdd,
            },
          ],
        };
        setComments(fields.comments);

        await axios.post(`${_COMMENTS_ROUTE}/${id}`, fields);
        setCommentAdd("");
      }
    } catch (err) {
      console.warn(err);
      alert("Error sending on backend comment!");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={avatar} />
        <div className={styles.form}>
          <TextField
            value={commentAdd}
            onChange={(e) => writeComment(e)}
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmitComment} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
