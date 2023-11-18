import { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { login } from 'store/reducers/authSlice';
import { ILoginRequest } from 'services/services.interface';

const scheme = yup.object({
  email_login: yup.string().required('Поле обязательно'),
  password: yup.string().required('Пароль обязателен'),
});

const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginRequest>({
    mode: 'all',
    resolver: yupResolver(scheme),
  });

  const { isAuthLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = (data: ILoginRequest) => {
    dispatch(login(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Grid
        container
        flexDirection="column"
        alignContent="stretch"
        justifyContent="center"
        gap={2}
      >
        <Typography textAlign="center" variant="h4">
          Вход
        </Typography>
        <TextField
          {...register('email_login')}
          error={!!errors?.email_login?.message}
          helperText={errors?.email_login?.message}
          label="Логин или почта"
          size="small"
        />
        <TextField
          {...register('password')}
          error={!!errors?.password?.message}
          helperText={errors?.password?.message}
          label="Пароль"
          type="password"
          size="small"
        />
        <Button
          type="submit"
          disabled={isAuthLoading || !isValid}
          variant="contained"
          color="success"
        >
          Войти
        </Button>
      </Grid>
    </Box>
  );
};

export default Login;
