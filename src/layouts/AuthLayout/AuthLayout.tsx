import { FC, FormEventHandler, ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

import { useAppSelector } from 'common/hooks';
import { Logo } from 'components';

interface IAuthLayout {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isValid?: boolean;
  children?: ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ onSubmit, isValid, children }) => {
  const { isAuthLoading } = useAppSelector(state => state.auth);
  const location = useLocation();
  const isLogin = location.pathname === '/auth/login';

  return (
    <Container maxWidth={false} sx={{ maxWidth: '350px' }}>
      <Logo size="large" />
      <Grid
        container
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        gap={3}
        marginTop={4}
      >
        <Box component="form" onSubmit={onSubmit} style={{ width: '100%' }}>
          <Grid
            container
            flexDirection="column"
            alignContent="stretch"
            justifyContent="center"
            gap={2}
          >
            <Typography textAlign="center" variant="h4">
              {isLogin ? 'Вход' : 'Регистрация'}
            </Typography>
            {children}
            <Button
              type="submit"
              disabled={isAuthLoading || !isValid}
              variant="contained"
              color="success"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Grid>
          <Link to={isLogin ? '/auth/registration' : '/auth/login'}>
            <Typography
              sx={{ ':hover': { textDecorationLine: 'underline' } }}
              marginTop={1}
              textAlign="center"
              color="black"
              variant="body2"
            >
              {isLogin ? 'Нет аккаунта?' : 'Есть аккаунта?'}
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Container>
  );
};

export default AuthLayout;
