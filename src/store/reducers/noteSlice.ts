import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
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
    const thunks = [getGroupNotes, updateNote, createNote, deleteNote] as const;

    builder
      .addCase(createNote.pending, state => {
        state.loading = LoadingEnum.CREATE;
      })
      .addCase(updateNote.pending, state => {
        state.loading = LoadingEnum.UPDATE;
      })
      .addCase(deleteNote.pending, state => {
        state.loading = LoadingEnum.DELETE;
      })

      .addCase(deleteNote.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter(note => note.id !== payload);
      })

      .addCase(getGroupNotes.pending, state => {
        if (state.loading !== LoadingEnum.IDLE) return;

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
      return rejectWithValue('[getGroupNotes]: Error!');
    }
  },
);

export const createNote = createAsyncThunk<INote, ICreateNoteRequest, AsyncThunkConfig>(
  'note/createNote',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await noteService.create(data);
      await dispatch(getGroupNotes(res.groupId));
      return res;
    } catch {
      return rejectWithValue('[createNote]: Error!');
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

export const deleteNote = createAsyncThunk<number, number, AsyncThunkConfig>(
  'note/deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      await noteService.delete(id);
      return id;
    } catch {
      return rejectWithValue('[deleteNote]: Error!');
    }
  },
);
