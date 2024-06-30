import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/slices/authSlice';
import {
  _ADD_POST_ROUTE,
  _HOME_ROUTE,
  _LOGIN_ROUTE,
  _REGISTER_ROUTE,
} from '../../utils/constants';
import styles from './Header.module.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(selectIsAuth);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
    }
  };

  const renderButtons = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <div className={styles.inner}>
          <Link className={styles.logo} to={_HOME_ROUTE}>
            <div>Blog App</div>
          </Link>
          <div className={styles.buttons}>
            {isUserAuthenticated ? (
              <>
                <Link to={_ADD_POST_ROUTE}>
                  <Button variant="contained">Create post</Button>
                </Link>
                <Button
                  onClick={handleLogout}
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
