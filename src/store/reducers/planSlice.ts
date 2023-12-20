import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';

import { AsyncThunkConfig, LoadingEnum } from 'common/interfaces';
import { planService } from 'services/services';
import {
  ICreatePlanRequest,
  IPlan,
  IUpdatePlanRequest,
} from 'services/services.interface';

interface IPlanInitialState {
  plans: IPlan[];
  loading: LoadingEnum;
}

const initialState: IPlanInitialState = {
  plans: [],
  loading: LoadingEnum.IDLE,
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const thunks = [] as const;

    builder
      .addCase(createPlan.pending, state => {
        state.loading = LoadingEnum.CREATE;
      })
      .addCase(updatePlan.pending, state => {
        state.loading = LoadingEnum.UPDATE;
      })
      .addCase(deletePlan.pending, state => {
        state.loading = LoadingEnum.DELETE;
      })

      .addCase(deletePlan.fulfilled, (state, { payload }) => {
        state.plans = state.plans.filter(plan => plan.id !== payload);
      })

      .addCase(getGroupPlans.pending, state => {
        if (state.loading !== LoadingEnum.IDLE) return;

        state.loading = LoadingEnum.GET;
      })
      .addCase(getGroupPlans.fulfilled, (state, { payload }) => {
        state.plans = payload;
      })

      .addMatcher(isAnyOf(isRejected(...thunks), isFulfilled(...thunks)), state => {
        state.loading = LoadingEnum.IDLE;
      });
  },
});

export const planReducer = planSlice.reducer;
export const {} = planSlice.actions;

export const getGroupPlans = createAsyncThunk<IPlan[], number, AsyncThunkConfig>(
  'plan/getGroupPlans',
  async (id, { rejectWithValue }) => {
    try {
      return await planService.getByGroup(id);
    } catch {
      return rejectWithValue('[getGroupPlans]: Error!');
    }
  },
);

export const createPlan = createAsyncThunk<IPlan, ICreatePlanRequest, AsyncThunkConfig>(
  'plan/createPlan',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await planService.create(data);
      await dispatch(getGroupPlans(res.groupId));
      return res;
    } catch {
      return rejectWithValue('[createPlan]: Error!');
    }
  },
);

export const updatePlan = createAsyncThunk<IPlan, IUpdatePlanRequest, AsyncThunkConfig>(
  'plan/updatePlan',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await planService.update(data);
      await dispatch(getGroupPlans(res.groupId));
      return res;
    } catch {
      return rejectWithValue('[updatePlan]: Error!');
    }
  },
);

export const deletePlan = createAsyncThunk<number, number, AsyncThunkConfig>(
  'plan/deletePlan',
  async (id, { rejectWithValue }) => {
    try {
      await planService.delete(id);
      return id;
    } catch {
      return rejectWithValue('[deletePlan]: Error!');
    }
  },
);
