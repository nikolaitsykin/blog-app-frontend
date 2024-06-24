import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { fetchAuthMe } from "./redux/actions/authActions";
import { selectIsAuth } from "./redux/slices/authSlice";
import {
  _ADD_POST_ROUTE,
  _EDIT_POST_ROUTE,
  _HOME_ROUTE,
  _LOGIN_ROUTE,
  _POST_ROUTE,
  _REGISTER_ROUTE,
  _TAGS_ID_ROUTE,
} from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path={_HOME_ROUTE} element={<Home />} />
          <Route path={_POST_ROUTE} element={<FullPost />} />
          <Route path={_EDIT_POST_ROUTE} element={<AddPost />} />
          <Route path={_ADD_POST_ROUTE} element={<AddPost />} />
          <Route path={_LOGIN_ROUTE} element={<Login />} />
          <Route path={_REGISTER_ROUTE} element={<Registration />} />
          <Route path={_TAGS_ID_ROUTE} element={<Home />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
