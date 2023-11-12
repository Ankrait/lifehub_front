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
