import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { AsyncThunkConfig } from 'common/interfaces';
import { authService } from 'services/services';
import {
  ILoginRequest,
  IRegistrationRequest,
  ISessionResponse,
} from 'services/services.interface';
import { errorNotice } from 'common/utils';

interface IAuthInitialState {
  user: ISessionResponse | null;
  isAuthLoading: boolean;
}

const initialState: IAuthInitialState = {
  user: null,
  isAuthLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const authThunks = [login, logout, registration] as const;
    builder
      .addCase(getSession.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      })
      .addMatcher(
        isAnyOf(isRejected(...authThunks), isFulfilled(...authThunks)),
        state => {
          state.isAuthLoading = false;
        },
      )
      .addMatcher(isPending(...authThunks), state => {
        state.isAuthLoading = true;
      });
  },
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;

export const getSession = createAsyncThunk<ISessionResponse, void, AsyncThunkConfig>(
  'auth/getSession',
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getSession();
    } catch (error) {
      return rejectWithValue('[getSession]: Error');
    }
  },
);

export const login = createAsyncThunk<void, ILoginRequest, AsyncThunkConfig>(
  'auth/login',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      await authService.login(params);
      await dispatch(getSession());
    } catch (e) {
      errorNotice(dispatch, e);
      return rejectWithValue('[login]: Error');
    }
  },
);

export const registration = createAsyncThunk<
  void,
  IRegistrationRequest,
  AsyncThunkConfig
>('auth/registration', async (params, { dispatch, rejectWithValue }) => {
  try {
    await authService.registration(params);
    await dispatch(getSession());
  } catch (e) {
    errorNotice(dispatch, e);
    return rejectWithValue('[registration]: Error');
  }
});

export const logout = createAsyncThunk<void, void, AsyncThunkConfig>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await authService.logout();
    } catch {
      return rejectWithValue('[registration]: Error');
    }
  },
);
