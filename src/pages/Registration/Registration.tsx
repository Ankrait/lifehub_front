import { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { registration } from 'store/reducers/authSlice';
import { IRegistrationRequest } from 'services/services.interface';

const scheme = yup.object({
  email: yup.string().email('Некорректная почта').required('Почта обязательна'),
  login: yup.string().required('Логин обязательна'),
  password: yup.string().required('Пароль обязателен'),
});

const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegistrationRequest>({
    mode: 'all',
    resolver: yupResolver(scheme),
  });

  const { isAuthLoading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = (data: IRegistrationRequest) => {
    dispatch(registration(data));
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
          Регистрация
        </Typography>
        <TextField
          {...register('email')}
          error={!!errors?.email?.message}
          helperText={errors?.email?.message}
          label="Почта"
          size="small"
        />
        <TextField
          {...register('login')}
          error={!!errors?.login?.message}
          helperText={errors?.login?.message}
          label="Логин"
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
          Зарегистрироваться
        </Button>
      </Grid>
    </Box>
  );
};

export default Registration;
