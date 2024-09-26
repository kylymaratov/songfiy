import { useEffect } from 'react';
import { apiRequest } from 'src/api/api';
import { useAppDispatch } from 'src/store/hooks';
import {
  setAuth,
  setCheckingSession,
  setUser,
  setUserInfo,
  TUser,
  TUserInfo,
} from 'src/store/slices/user-slice';

export const UseAuth = () => {
  const dispatch = useAppDispatch();

  const checkSession = async () => {
    try {
      dispatch(setCheckingSession(true));
      const user = await apiRequest<TUser>('/users/session');

      dispatch(setAuth(true));
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setAuth(false));
      dispatch(setUser(null));
    } finally {
      dispatch(setCheckingSession(false));
    }
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await apiRequest<TUserInfo>('/users/info');

      dispatch(setUserInfo(userInfo));
    } catch (error) {}
  };

  useEffect(() => {
    checkSession().then(() => getUserInfo());
  }, []);
};
