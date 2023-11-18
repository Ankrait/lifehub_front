import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/material';

import { createRouter } from 'router/router';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useEffect } from 'react';
import { initialize } from 'store/reducers/appSlice';

function App() {
  const { user } = useAppSelector(state => state.auth);
  const { isAppInitialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!isAppInitialized) {
    return <></>;
  }

  return (
    <Container>
      <RouterProvider router={createRouter(!!user)} />
    </Container>
  );
}

export default App;
