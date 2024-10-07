import React from "react";

import TagIcon from "@mui/icons-material/Tag";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { _TAGS_ROUTE } from "../utils/constants";
import { SideBlock } from "./SideBlock";

export const TagsBlock = ({ items, isLoading = true }) => {
  const uniqueTags = [...new Set(items)];

  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(3)] : uniqueTags).map((tag, index) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`${_TAGS_ROUTE}/${tag}`}
            key={index}
          >
            <ListItem key={index} cPadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={tag} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
