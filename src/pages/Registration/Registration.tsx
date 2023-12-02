import { FC } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

import { useAppDispatch } from 'common/hooks';
import { registration } from 'store/reducers/authSlice';
import { IRegistrationRequest } from 'services/services.interface';
import { AuthLayout } from 'layouts';

const scheme = yup.object({
  email: yup.string().email('Некорректная почта').required('Поле обязательно'),
  login: yup
    .string()
    .min(4, 'Минимальная длина 4 символа')
    .max(12, 'Максимальная длина 12 символов')
    .required('Логин обязательна'),
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

  const dispatch = useAppDispatch();

  const onSubmit = (data: IRegistrationRequest) => {
    dispatch(registration(data));
  };

  return (
    <AuthLayout onSubmit={handleSubmit(onSubmit)} isValid={isValid}>
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
    </AuthLayout>
  );
};

export default Registration;
