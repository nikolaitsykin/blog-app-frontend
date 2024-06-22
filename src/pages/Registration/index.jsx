import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userRegister } from "../../redux/actions/authActions";
import { selectIsAuth } from "../../redux/slices/authSlice";
import axios from "../../utils/axios";
import { _BASE_URL, _HOME_ROUTE, _UPLOAD_URL } from "../../utils/constants";
import styles from "./Registration.module.scss";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Registration = React.memo(() => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { error, errorPath } = useSelector((state) => state.auth);
  const [preview, setPreview] = React.useState(null);
  const hiddenInputRef = React.useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onUpload = React.useCallback(() => {
    hiddenInputRef.current.click();
  }, []);

  const handleChangeFile = React.useCallback(async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(`${_UPLOAD_URL}`, formData);
      setPreview(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error upload file");
    }
  }, []);

  const onSubmit = React.useCallback(
    ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
        avatarUrl: _BASE_URL + preview,
      };
      dispatch(userRegister(data));
    },
    [dispatch, preview]
  );

  React.useEffect(() => {
    if (error) {
      setError(`${errorPath}`, {
        type: "custom",
        message: error,
      });
    }
  }, [error, errorPath, setError]);

  const uploadButtonLabel = preview ? "Change image" : "Upload image";

  if (isAuth) {
    return <Navigate to={_HOME_ROUTE} />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Registration
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          src={preview ? `${_BASE_URL}${preview}` : "../../images/no_avatar.png"}
          sx={{ width: 100, height: 100 }}
        />
        <input
          type="file"
          ref={hiddenInputRef}
          onChange={handleChangeFile}
          hidden
        />
        <Button
          style={{ marginTop: 10 }}
          onClick={onUpload}
          variant="outlined"
          size="small"
        >
          {uploadButtonLabel}
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.name?.message)}
          helperText={errors.name?.message}
          {...register("name", { required: "Enter your name" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Enter your email" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type={showPassword ? "text" : "password"}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter your password" })}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disabled={!isValid}
        >
          Register
        </Button>
      </form>
    </Paper>
  );
});
