import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './reducers/appSlice';

export const store = configureStore({
	reducer: {
		app: appReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type RootDispatchType = typeof store.dispatch;
