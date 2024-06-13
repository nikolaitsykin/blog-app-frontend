import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import {
  _ADD_POST_ROUTE,
  _HOME_ROUTE,
  _LOGIN_ROUTE,
  _REGISTER_ROUTE,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <div className={styles.inner}>
          <Link className={styles.logo} to={_HOME_ROUTE}>
            <div>BLOG APP</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={_ADD_POST_ROUTE}>
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={_LOGIN_ROUTE}>
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to={_REGISTER_ROUTE}>
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
