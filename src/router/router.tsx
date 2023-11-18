import { Navigate, createBrowserRouter } from 'react-router-dom';

import { AuthLayout, RootLayout } from 'layouts';
import { Account, Home, Login, Registration } from 'pages';

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
                  element: <>MAIN</>,
                },
                {
                  path: '/account',
                  element: <Account />,
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
              element: <AuthLayout />,
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
