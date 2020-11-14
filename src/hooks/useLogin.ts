import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { loginThunk } from '../modules/auth/authThunk';
import { useCallback } from 'react';

const useLogin = () => {
  const { id, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const onLogin = useCallback(() => dispatch(loginThunk()), [dispatch])

  return {
    id,
    error,
    onLogin,
  }
}

export default useLogin;