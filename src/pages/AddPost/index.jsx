import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import 'easymde/dist/easymde.min.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import { selectIsAuth } from '../../redux/slices/authSlice';
import axios from '../../utils/axios';
import {
  _BASE_URL,
  _EDIT_ROUTE,
  _HOME_ROUTE,
  _POSTS_ROUTE,
  _UPLOAD_URL,
} from '../../utils/constants';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const navigate = useNavigate();
  const isUserAuthenticated = useSelector(selectIsAuth);
  const token = window.localStorage.getItem('token');

  const [isLoading, setIsLoading] = React.useState(false);
  const inputFileRef = React.useRef(null);
  const [fields, setFields] = React.useState({
    title: '',
    text: '',
    tags: '',
    imageUrl: '',
  });

  const { id } = useParams();
  const isEditing = Boolean(id);

  React.useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, []);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${_POSTS_ROUTE}/${id}`);
      setFields({
        title: data.title,
        text: data.text,
        tags: data.tags.join(', '),
        imageUrl: data.imageUrl,
      });
    } catch (error) {
      console.warn(error);
      alert('Error when getting post!');
    }
  };

  const onChange = React.useCallback((field, value) => {
    setFields((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }, []);

  const handleChangeFile = React.useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post(`${_UPLOAD_URL}`, formData);
      setFields((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (error) {
      console.warn(error);
      alert('Error upload file');
    }
  }, []);

  const onClickRemoveImage = React.useCallback(() => {
    setFields((prev) => ({ ...prev, imageUrl: '' }));
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '200px',
      autofocus: true,
      placeholder: 'Type here...',
      status: false,
      autosave: {
        enabled: true,
        uniqueId: 'react-autosave-textarea',
        delay: 1000,
      },
    }),
    []
  );

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fieldsCopy = {
        ...fields,
        tags: fields.tags.replace(/,/g, '').split(' '),
      };
      const { data } = isEditing
        ? await axios.patch(`${_POSTS_ROUTE}/${id}${_EDIT_ROUTE}`, fieldsCopy)
        : await axios.post(`${_POSTS_ROUTE}`, fieldsCopy);

      const postId = isEditing ? id : data._id;

      navigate(`${_POSTS_ROUTE}/${postId}`);
    } catch (error) {
      console.warn(error);
      alert(isEditing ? 'Error edit post' : 'Error create post');
    }
  };

  if (!isUserAuthenticated && !token) {
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
        onChange={(e) => onChange('title', e.target.value)}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
      />
      <TextField
        id="tags"
        value={fields.tags}
        onChange={(e) => onChange('tags', e.target.value)}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        id="simplemde"
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
          {isEditing ? 'Save' : 'Publish'}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
