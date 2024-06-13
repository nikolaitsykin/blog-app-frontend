import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/actions/authActions";
import styles from "./Login.module.scss";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { _HOME_ROUTE } from "../../utils/constants";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = (values) => {
    dispatch(userRegister(values));
    alert(`Welcome ${values.name}, your are successfully registered!`);
  };

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

  if (isAuth) {
    return <Navigate to={_HOME_ROUTE} />;
  }

  return (
    <Paper elevation={0} classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account registration
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
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
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter your password" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};
