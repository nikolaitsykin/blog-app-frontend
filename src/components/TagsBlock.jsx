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

export const TagsBlock = ({ items, isLoading }) => {
  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "black" }}
            to={`${_TAGS_ROUTE}/${name}`}
          >
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
