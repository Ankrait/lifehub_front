import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice';
import { authReducer } from './reducers/authSlice';
import { groupReducer } from './reducers/groupSlice';

export const store = configureStore({
	reducer: {
		app: appReducer,
		auth: authReducer,
		group: groupReducer
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type RootDispatchType = typeof store.dispatch;
