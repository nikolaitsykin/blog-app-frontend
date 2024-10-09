import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import {
  _AUTH_ME_ROUTE,
  _BASE_URL,
  _LOGIN_ROUTE,
  _REGISTER_ROUTE,
} from '../../utils/constants';

export const userLogin = createAsyncThunk(
  'auth/login',
  async (params, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${_BASE_URL + _LOGIN_ROUTE}`,
        params,
        config
      );
      if (!data) {
        return alert('Failed to login');
      }
      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  'auth/register',
  async (params, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(`${_REGISTER_ROUTE}`, params, config);
      if (!data) {
        return alert('Failed to register');
      }
      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response);
      }
    }
  }
);

export const fetchAuthMe = createAsyncThunk('auth/me', async () => {
  const { data } = await axios.get(_AUTH_ME_ROUTE);

  return data;
});
