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
import { errorNotice } from 'common/utils';
import { collaboratorService, groupService, labelService } from 'services/services';
import {
  ICollaborator,
  ICreateCollaboratorRequest,
  ICreateGroupRequest,
  ICreateLabelRequest,
  IDeleteCollaboratorRequest,
  IFullGroup,
  IGroup,
  ILabel,
} from 'services/services.interface';

interface IGroupInitialState {
  groups: IGroup[];
  group: IFullGroup | null;
  collaborators: ICollaborator[];
  isGroupLoading: boolean;
  isGroupCreatorOpened: boolean;
}

const initialState: IGroupInitialState = {
  groups: [],
  group: null,
  collaborators: [],
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
    const thunks = [getUserGroups, createGroup, getGroup, createLabel] as const;

    builder
      .addCase(getUserGroups.fulfilled, (state, { payload }) => {
        state.groups = payload;
      })
      .addCase(createGroup.fulfilled, (state, { payload }) => {
        state.groups.push(payload);
      })
      .addCase(getGroup.fulfilled, (state, { payload }) => {
        state.group = payload;
      })
      .addCase(createLabel.fulfilled, (state, { payload }) => {
        state.group?.labels.push(payload);
      })

      .addCase(getCollaborators.fulfilled, (state, { payload }) => {
        state.collaborators = payload;
      })
      .addCase(deleteCollaborator.fulfilled, (state, { payload }) => {
        state.collaborators = state.collaborators.filter(
          el => el.userId !== payload.userId || el.groupId !== payload.groupId,
        );
      })
      .addCase(addCollaborator.fulfilled, (state, { payload }) => {
        if (!state.collaborators.find(el => el.id === payload.id))
          state.collaborators.push(payload);
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

export const getGroup = createAsyncThunk<IFullGroup, number, AsyncThunkConfig>(
  'group/getGroup',
  async (id, { rejectWithValue }) => {
    try {
      return await groupService.get(id);
    } catch {
      return rejectWithValue('[getGroup]: Error!');
    }
  },
);

export const getUserGroups = createAsyncThunk<IGroup[], void, AsyncThunkConfig>(
  'group/getUserGroups',
  async (_, { rejectWithValue }) => {
    try {
      const data = await groupService.getAll();
      return data;
    } catch {
      return rejectWithValue('[getUserGroups]: Error!');
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
    return rejectWithValue('[createGroup]: Error!');
  }
});

export const createLabel = createAsyncThunk<
  ILabel,
  ICreateLabelRequest,
  AsyncThunkConfig
>('group/createLabel', async (req, { dispatch, rejectWithValue }) => {
  try {
    return await labelService.create(req);
  } catch (e) {
    errorNotice(dispatch, e);
    return rejectWithValue('[createLabel]: Error!');
  }
});

export const getCollaborators = createAsyncThunk<
  ICollaborator[],
  number,
  AsyncThunkConfig
>('group/getCollaborators', async (id, { rejectWithValue }) => {
  try {
    return await collaboratorService.getByGroup(id);
  } catch (e) {
    return rejectWithValue('[getCollaborators]: Error!');
  }
});

export const addCollaborator = createAsyncThunk<
  ICollaborator,
  ICreateCollaboratorRequest,
  AsyncThunkConfig
>('group/addCollaborator', async (req, { rejectWithValue }) => {
  try {
    return await collaboratorService.create(req);
  } catch (e) {
    return rejectWithValue('[addCollaborator]: Error!');
  }
});

export const deleteCollaborator = createAsyncThunk<
  IDeleteCollaboratorRequest,
  IDeleteCollaboratorRequest,
  AsyncThunkConfig
>('group/deleteCollaborator', async (req, { rejectWithValue }) => {
  try {
    await collaboratorService.delete(req);
    return req;
  } catch (e) {
    return rejectWithValue('[deleteCollaborator]: Error!');
  }
});
