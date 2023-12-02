import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

import { createRouter } from 'router/router';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { initialize } from 'store/reducers/appSlice';
import { FullscreenLoader } from 'components';
import NoticePopup from 'components/NoticePopup/NoticePopup';

function App() {
  const { user, isAuthLoading } = useAppSelector(state => state.auth);
  const { isAppInitialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!isAppInitialized) {
    return <FullscreenLoader />;
  }

  return (
    <>
      {isAuthLoading && (
        <LinearProgress
          color="primary"
          sx={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
        />
      )}
      <RouterProvider router={createRouter(!!user)} />
      <NoticePopup />
    </>
  );
}

export default App;
