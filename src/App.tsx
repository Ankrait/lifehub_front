import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/material';

import { createRouter } from 'router/router';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useEffect } from 'react';
import { getSession } from 'store/reducers/authSlice';

function App() {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getSession());
	}, []);

	return (
		<Container>
			<RouterProvider router={createRouter(!!user)} />
		</Container>
	);
}

export default App;
