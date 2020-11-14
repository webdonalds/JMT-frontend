import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest } from '../auth/auth';

const loginThunk = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());
  }
}

export {
  loginThunk,
};