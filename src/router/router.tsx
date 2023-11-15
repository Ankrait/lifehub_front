import { createHashRouter } from 'react-router-dom';

import { RootLayout } from 'layouts';
import { Account } from 'pages';

export const createRouter = (isAuth: boolean) => {
	return createHashRouter([
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
							],
						},
				  ]
				: [{ path: '/', element: <>NOT AUTH</> }],
		},
	]);
};
