import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "easymde/dist/easymde.min.css";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../redux/slices/authSlice";
import axios from "../../utils/axios";
import {
  _BASE_URL,
  _HOME_ROUTE,
  _POSTS_ROUTE,
  _UPLOAD_URL,
} from "../../utils/constants";
import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef(null);
  const [fields, setFields] = React.useState({
    title: "",
    text: "",
    tags: "",
    imageUrl: "",
  });

  const onChange = React.useCallback((field, value) => {
    setFields((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }, []);

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(`${_UPLOAD_URL}`, formData);
      console.log(data);
      setFields((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (error) {
      console.warn(error);
      alert("Error upload file");
    }
  };

  const onClickRemoveImage = () => {
    setFields((prev) => ({ ...prev, imageUrl: "" }));
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "200px",
      autofocus: true,
      placeholder: "Type here...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fieldsCopy = { ...fields, tags: fields.tags.split(",") };
      const { data } = await axios.post(`${_POSTS_ROUTE}`, fieldsCopy);
      const id = data._id;
      navigate(`${_POSTS_ROUTE}/${id}`);
    } catch (error) {
      console.warn(error);
      alert("Error create post");
    }
  };

  if (!isAuth && !token) {
    return <Navigate to={_HOME_ROUTE} />;
  }

  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button
        style={{ marginRight: 10 }}
        onClick={(e) => inputFileRef.current.click()}
        variant="outlined"
        size="medium"
      >
        Load preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {fields.imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={`${_BASE_URL}${fields.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        id="title"
        value={fields.title}
        onChange={(e) => onChange("title", e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
      />
      <TextField
        id="tags"
        value={fields.tags}
        onChange={(e) => onChange("tags", e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        id="text"
        className={styles.editor}
        value={fields.text}
        onChange={(text) => setFields({ ...fields, text })}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          type="submit"
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          Post
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
