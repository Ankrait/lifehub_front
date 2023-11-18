import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAppDispatch } from 'common/hooks';
import { logout } from 'store/reducers/authSlice';

const RootLayout: FC = () => {
  const dispatch = useAppDispatch();

  const onExitClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button onClick={onExitClick} variant="contained" color="error">
        Выход
      </Button>
      <Outlet />
    </>
  );
};

export default RootLayout;
