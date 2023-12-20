import { RootStateType, RootDispatchType } from 'store/createStore';

export type AsyncThunkConfig = {
  state: RootStateType;
  dispatch: RootDispatchType;
  extra?: unknown;
  rejectValue: string;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export enum LoadingEnum {
  IDLE,
  GET,
  CREATE,
  UPDATE,
  DELETE,
  LOAD,
}

export type LabelType = 'FINANCE' | 'TASK' | 'ALL';
export type RoleType = 'OWNER' | 'ADMIN' | 'USER';
