import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/authActions";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { _HOME_ROUTE } from "../../utils/constants";
import styles from "./Login.module.scss";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const isUserAuthenticated = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const { error, errorPath } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    dispatch(userLogin(values));
  };

  useEffect(() => {
    if (error) {
      setError(`${errorPath}`, {
        type: "custom",
        message: error,
      });
    }
  }, [error]);

  if (isUserAuthenticated) {
    return <Navigate to={_HOME_ROUTE} />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};
