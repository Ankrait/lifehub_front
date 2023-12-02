import { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import { useAppDispatch } from 'common/hooks';
import { login } from 'store/reducers/authSlice';
import { ILoginRequest } from 'services/services.interface';
import { AuthLayout } from 'layouts';

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

  const dispatch = useAppDispatch();

  const onSubmit = (data: ILoginRequest) => {
    dispatch(login(data));
  };

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
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
    </AuthLayout>
  );
};

export default Login;
