import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import "easymde/dist/easymde.min.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import { fetchPosts } from "../../redux/actions/postsActions";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const token = window.localStorage.getItem("token");
  const { posts } = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef(null);
  const [fields, setFields] = React.useState({
    title: "",
    text: "",
    tags: "",
    imageUrl: "",
  });

  const { id } = useParams();
  const postIsEditing = id ? posts.items.find((obj) => obj._id === id) : null;

  const onChange = React.useCallback(
    (field, value) => {
      if (postIsEditing) {
        setFields((prevFields) => ({
          ...prevFields,
          [field]:
            value !== (postIsEditing[field] || prevFields[field])
              ? value
              : prevFields[field],
        }));
      } else {
        setFields((prevForm) => ({
          ...prevForm,
          [field]: value,
        }));
      }
    },
    [postIsEditing]
  );

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(`${_UPLOAD_URL}`, formData);
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
      if (id) {
        setIsLoading(true);
        await axios.patch(`${_POSTS_ROUTE}/${id}/edit`, { ...fields });
        navigate(`${_POSTS_ROUTE}/${id}`);
      } else {
        setIsLoading(true);
        const fieldsCopy = { ...fields, tags: fields.tags.trim().split(" ") };
        const { data } = await axios.post(`${_POSTS_ROUTE}`, fieldsCopy);
        const id = data._id;
        navigate(`${_POSTS_ROUTE}/${id}`);
      }
    } catch (error) {
      console.warn(error);
      alert("Error create post");
    }
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [id]);

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
