import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { AuthAction, loginRequest, loginTimeout, timeoutMilliSecond } from '../auth/auth';

const loginThunk = (nickname: string, present: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());
    // TODO: login request
    setTimeout(() => dispatch(loginTimeout()), timeoutMilliSecond);
  }
}

const reLoginThunk = (token: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async (dispatch) => {
    dispatch(loginRequest());
    // TODO: re-login request
    setTimeout(() => dispatch(loginTimeout()), timeoutMilliSecond);
  }
}

export {
  loginThunk,
  reLoginThunk
};