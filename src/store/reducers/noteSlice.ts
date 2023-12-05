import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { AsyncThunkConfig, LoadingEnum } from 'common/interfaces';
import { noteService } from 'services/services';
import {
  ICreateNoteRequest,
  INote,
  IUpdateNoteRequest,
} from 'services/services.interface';

interface INoteInitialState {
  notes: INote[];
  loading: LoadingEnum;
}

const initialState: INoteInitialState = {
  notes: [],
  loading: LoadingEnum.IDLE,
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const thunks = [getGroupNotes, updateNote, createNote] as const;

    builder
      .addCase(createNote.pending, state => {
        state.loading = LoadingEnum.CREATE;
      })
      .addCase(updateNote.pending, state => {
        state.loading = LoadingEnum.UPDATE;
      })

      .addCase(getGroupNotes.pending, state => {
        state.loading = LoadingEnum.GET;
      })
      .addCase(getGroupNotes.fulfilled, (state, { payload }) => {
        state.notes = payload;
      })

      .addMatcher(isAnyOf(isRejected(...thunks), isFulfilled(...thunks)), state => {
        state.loading = LoadingEnum.IDLE;
      });
  },
});

export const noteReducer = noteSlice.reducer;
export const {} = noteSlice.actions;

export const getGroupNotes = createAsyncThunk<INote[], number, AsyncThunkConfig>(
  'note/getGroupNotes',
  async (id, { rejectWithValue }) => {
    try {
      return await noteService.getByGroup(id);
    } catch {
      return rejectWithValue('[getGroupNotes]: Error');
    }
  },
);

export const createNote = createAsyncThunk<INote, ICreateNoteRequest, AsyncThunkConfig>(
  'note/createNote',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await noteService.create(data);
      dispatch(getGroupNotes(res.groupId));
      return res;
    } catch {
      return rejectWithValue('[createNote]: Error');
    }
  },
);

export const updateNote = createAsyncThunk<INote, IUpdateNoteRequest, AsyncThunkConfig>(
  'note/updateNote',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await noteService.update(data);
      await dispatch(getGroupNotes(res.groupId));
      return res;
    } catch {
      return rejectWithValue('[updateNote]: Error!');
    }
  },
);
