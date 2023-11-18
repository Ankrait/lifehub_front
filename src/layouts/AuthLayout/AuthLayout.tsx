import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';

const AuthLayout: FC = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: '350px' }}>
      <Grid
        container
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        gap={3}
      >
        <Outlet />
      </Grid>
    </Container>
  );
};

export default AuthLayout;
