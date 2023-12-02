import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AsyncThunkConfig } from 'common/interfaces';
import { getSession } from './authSlice';
import { getUserGroups } from './groupSlice';

export interface INotice {
	message: string;
	type: 'error' | 'success';
}

interface IAppInitialState {
	isAppInitialized: boolean;
	notice: INotice | null;
	loading: boolean;
}

const initialState: IAppInitialState = {
	isAppInitialized: false,
	notice: null,
	loading: false,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setNotice: (state, action: PayloadAction<INotice | null>) => {
			state.notice = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initialize.fulfilled, (state) => {
			state.isAppInitialized = true;
		});
		builder.addCase(initialize.rejected, (state) => {
			state.isAppInitialized = true;
		});
	},
});

export const appReducer = appSlice.reducer;
export const { setNotice, setLoading } = appSlice.actions;

export const initialize = createAsyncThunk<void, void, AsyncThunkConfig>(
	'app/initialize',
	async (_, { dispatch, rejectWithValue }) => {
		dispatch(setLoading(true));
		try {
			await dispatch(getSession());
			await dispatch(getUserGroups());
		} catch (error) {
			return rejectWithValue('[initialize]: Error');
		} finally {
			dispatch(setLoading(false));
		}
	}
);
