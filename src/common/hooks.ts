import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';

import { RootDispatchType, RootStateType } from 'store/createStore';

export const useAppDispatch: () => RootDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
