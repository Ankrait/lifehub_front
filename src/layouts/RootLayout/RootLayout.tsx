import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Grid, Paper } from '@mui/material';

import { Logo } from 'components';
import UserSelect from './UserSelect/UserSelect';
import GroupCreator from './GroupCreator/GroupCreator';

const RootLayout: FC = () => {
  return (
    <>
      <Paper elevation={5}>
        <Container component="header">
          <Grid paddingY={1} container justifyContent="space-between" alignItems="center">
            <Logo />
            <UserSelect />
          </Grid>
        </Container>
      </Paper>

      <Container sx={{ marginTop: 3 }}>
        <Outlet />
      </Container>

      <GroupCreator />
    </>
  );
};

export default RootLayout;
