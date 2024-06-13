import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import {
  _HOME_ROUTE,
  _LOGIN_ROUTE,
  _REGISTER_ROUTE,
  _ADD_POST_ROUTE,
  _EDIT_POST_ROUTE,
  _POST_ROUTE,
} from "./utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "./redux/slices/authSlice";
import { fetchAuthMe } from "./redux/actions/authActions";

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
        </Routes>
      </Container>
    </>
  );
}

export default App;
