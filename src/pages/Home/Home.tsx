import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

const Home: FC = () => {
  return (
    <Grid
      container
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      gap={3}
    >
      <Typography textAlign="center" variant="h3" fontWeight={600}>
        LifeHub
      </Typography>
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
  );
};

export default Home;
