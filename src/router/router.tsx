import { Navigate, createBrowserRouter } from 'react-router-dom';

import { GroupLayout, RootLayout } from 'layouts';
import { Account, GroupMain, Home, Login, Main, Notes, Plans, Registration, Settings } from 'pages';

export const createRouter = (isAuth: boolean) => {
  return createBrowserRouter([
    {
      path: '/',
      children: isAuth
        ? [
            {
              path: '/',
              element: <RootLayout />,
              children: [
                {
                  path: '/',
                  element: <Main />,
                },
                {
                  path: '/account',
                  element: <Account />,
                },
                {
                  path: '/group/:id',
                  element: <GroupLayout />,
                  children: [
                    {
                      path: '/group/:id',
                      element: <GroupMain />,
                    },
                    {
                      path: '/group/:id/notes',
                      element: <Notes />,
                    },
                    {
                      path: '/group/:id/plans',
                      element: <Plans />,
                    },
                    {
                      path: '/group/:id/settings',
                      element: <Settings />,
                    },
                  ],
                },
                {
                  path: '/auth/*',
                  element: <Navigate to="/" />,
                },
              ],
            },
          ]
        : [
            {
              path: '/',
              element: <Home />,
            },
            {
              path: '/auth',
              children: [
                {
                  path: '/auth',
                  element: <Navigate to="/auth/login" />,
                },
                {
                  path: '/auth/login',
                  element: <Login />,
                },
                {
                  path: '/auth/registration',
                  element: <Registration />,
                },
              ],
            },
          ],
    },
  ]);
};
