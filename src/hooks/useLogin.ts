import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginThunk, reLoginThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';

const useLogin = () => {
  const { token, nickname, responseStatus } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onLogin = useCallback((nickname: string, present: string) => dispatch(loginThunk(nickname, present)), [dispatch]);
  const onReLogin = useCallback((token: string) => dispatch(reLoginThunk(token)), [dispatch]);

  return {
    token,
    nickname,
    responseStatus,
    onLogin,
    onReLogin,
  }
}

export default useLogin;