import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { _COMMENTS_ROUTE } from "../utils/constants";
import { SideBlock } from "./SideBlock";

export const CommentsBlock = ({
  data,
  comments,
  setComments,
  children,
  authorId,
  isLoading = true,
}) => {
  const [value, setValue] = React.useState("");
  const userDataId = useSelector((state) => state.auth.data?._id);

  const avatar = data ? data.user.avatarUrl : "../images/no_avatar.png";

  const removeComment = async (value) => {
    try {
      setValue(value);
      const commentsNew = comments.filter((obj) => obj.text !== value);
      setComments(commentsNew);

      const fields = {
        ...data,
        comments: commentsNew,
      };

      await axios.post(`${_COMMENTS_ROUTE}/${data._id}`, fields);
    } catch (err) {
      console.warn(err);
      alert("Error when deleting a comment!");
    }
  };

  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(3)] : comments)?.map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.name} src={avatar} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                  value={obj.text}
                />
              )}
              {userDataId === authorId && userDataId !== undefined ? (
                <ListItemIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => removeComment(obj.text)}
                >
                  <DeleteForeverIcon />
                </ListItemIcon>
              ) : (
                ""
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
