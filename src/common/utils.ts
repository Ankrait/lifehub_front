import { AxiosError } from 'axios';

import { RootDispatchType } from 'store/createStore';
import { setNotice } from 'store/reducers/appSlice';

export const errorNotice = (dispatch: RootDispatchType, err: any) => {
  if (err instanceof AxiosError) {
    let mes = err?.response?.data.message;

    if (mes) {
      if (typeof mes !== 'string') mes = mes[0];

      if (mes) dispatch(setNotice({ type: 'error', message: mes }));
    }
  }
};

export const isNumber = (str: unknown) => {
  if (typeof str !== 'string') return false;
  return !isNaN(parseFloat(str));
};
