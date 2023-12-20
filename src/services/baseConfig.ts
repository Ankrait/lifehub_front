import axios from 'axios';

import { store } from 'store/createStore';
import { setNotice } from 'store/reducers/appSlice';

export const baseConfig = axios.create({
  // baseURL: 'http://localhost:3011',
  baseURL: 'https://45b6-188-225-50-141.ngrok-free.app',
  withCredentials: true,
});

baseConfig.interceptors.response.use(
  response => response,
  error => {
    const setError = (message: string) => setNotice({ message, type: 'error' });
    const status = error.response.status;

    if (status >= 500) {
      store.dispatch(setError('Упс! Что-то пошло не так'));
    } else if (error.code === 'ERR_NETWORK') {
      store.dispatch(setError('Проверьте подключение к интернету'));
    } else {
      console.log(error);
    }
    return Promise.reject(error);
  },
);
