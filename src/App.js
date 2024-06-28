import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { AddPost, FullPost, Home, Login, Registration } from "./pages";
import { fetchAuthMe } from "./redux/actions/authActions";
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
          <Route path="*" element={<Navigate to={_HOME_ROUTE} />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
