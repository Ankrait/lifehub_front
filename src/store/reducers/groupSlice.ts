import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AsyncThunkConfig } from 'common/interfaces';
import { groupService } from 'services/services';
import { ICreateGroupRequest, IGroup } from 'services/services.interface';

interface IGroupInitialState {
  groups: IGroup[];
  isGroupLoading: boolean;
  isGroupCreatorOpened: boolean;
}

const initialState: IGroupInitialState = {
  groups: [],
  isGroupLoading: false,
  isGroupCreatorOpened: false,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupCreatorOpened(state, { payload }: PayloadAction<boolean>) {
      state.isGroupCreatorOpened = payload;
    },
  },
  extraReducers: builder => {
    const thunks = [getUserGroups, createGroup] as const;

    builder
      .addCase(getUserGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
      })
      .addCase(createGroup.fulfilled, (state, { payload }) => {
        state.groups.push(payload);
      })
      .addMatcher(isAnyOf(isRejected(...thunks), isFulfilled(...thunks)), state => {
        state.isGroupLoading = false;
      })
      .addMatcher(isPending(...thunks), state => {
        state.isGroupLoading = true;
      });
  },
});

export const groupReducer = groupSlice.reducer;
export const { setGroupCreatorOpened } = groupSlice.actions;

export const getUserGroups = createAsyncThunk<IGroup[], void, AsyncThunkConfig>(
  'group/getUserGroups',
  async (_, { rejectWithValue }) => {
    try {
      const data = await groupService.getAll();
      return data;
    } catch {
      return rejectWithValue('[getUserGroups]: Error');
    }
  },
);

export const createGroup = createAsyncThunk<
  IGroup,
  ICreateGroupRequest,
  AsyncThunkConfig
>('group/createGroup', async (req, { rejectWithValue }) => {
  try {
    const data = await groupService.create(req);
    return data;
  } catch {
    return rejectWithValue('[createGroup]: Error');
  }
});