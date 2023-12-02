import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';

import { Logo } from 'components';

const Home: FC = () => {
  return (
    <Container>
      <Grid
        container
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        gap={3}
      >
        <Logo size="large" />
        <Link to="/auth/login">
          <Button sx={{ width: '100%' }} variant="contained">
            Вход
          </Button>
        </Link>
        <Link to="/auth/registration">
          <Button sx={{ width: '100%' }} variant="outlined">
            Регистрация
          </Button>
        </Link>
      </Grid>
    </Container>
  );
};

export default Home;
