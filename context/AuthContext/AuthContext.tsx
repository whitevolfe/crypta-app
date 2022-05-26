import React, { useContext, createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import authReducer from './AuthReducer';
import { ENTRYPOINT } from '../../config/entrypoint'
import { useRouter } from 'next/router';

interface IAuthContextProvider {
  children: React.ReactNode;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  token: string;
  error: object | null | string;
  loading: boolean;
  login: (username: string, password: string) => Promise<object>;
  register: (username: string, password: string) => Promise<object>;
  logout: () => void;
  resetError: () => void;
}

const initialState: IAuthContext = {
  isAuthenticated: false,
  token: '',
  error: null,
  loading: true,
  login: async () => { return { userId: '', token: '', isAuthenticated: false } },
  register: async () => { return { userId: '', token: '', isAuthenticated: false } },
  logout: () => { },
  resetError: () => { }
};

const AuthContext = createContext(initialState);

export function AuthContextProvider({ children }: React.PropsWithChildren<IAuthContextProvider>) {
  const authStateValues = useAuthProvider();
  return <AuthContext.Provider value={authStateValues}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  const authStates = useContext(AuthContext);
  return authStates;
}

function useAuthProvider() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const { isAuthenticated, token, error, loading } = authState;
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get('token');
    if (token) {
      const isExpired = isTokenExpired(token);
      if (!isExpired) {
        authDispatch({ type: 'LOGIN', payload: { token, isAuthenticated: true } });
      } else {
        authDispatch({ type: 'SET_AUTHENTICATED', payload: { isAuthenticated: false } });
      }
    } else {
      router.push('/');
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true);
    return axios.post(`${ENTRYPOINT}/authentication_token`, {
      email,
      password
    }
    ).then(res => {
      authDispatch({
        type: 'LOGIN',
        payload: {
          token: res.data.token,
          isAuthenticated: true,
          error: null
        }
      });
      cookie.set('token', res.data.token);
      router.push('/dashboard');
      return res.data;
    }).catch(err => {
      authDispatch({
        type: 'LOGIN',
        payload: {
          token: '',
          isAuthenticated: false,
          error: { type: 'LOGIN_FAILED', data: err?.response?.data ?? err }
        }
      });
      cookie.remove('token');
      return err;
    }).finally(() => {
      // setLoading(false);
    })
  }

  const register = async (username: string, password: string) => {
    setLoading(true);
    return axios.post(`${ENTRYPOINT}/users`, {
      email: username,
      password
    }).then(res => {
      authDispatch({
        type: 'RESET_ERROR',
        payload: undefined
      });
      return res.data;
    }).catch(err => {
      authDispatch({
        type: 'SET_ERROR',
        payload: { type: 'REGISTER_FAILED', data: err?.response?.data ?? err }
      });
      return err;
    }).finally(() => {
      setLoading(false);
    })
  };

  const logout = () => {
    authDispatch({
      type: 'LOGOUT',
      payload: undefined
    });
    cookie.remove('token');
  }

  const resetError = () => {
    authDispatch({
      type: 'RESET_ERROR',
      payload: null
    });
  }

  const setLoading = (loading: boolean) => {
    authDispatch({
      type: 'SET_LOADING',
      payload: loading
    });
  }

  return {
    isAuthenticated,
    login,
    register,
    logout,
    token,
    error,
    resetError,
    loading
  };
}

//decode jwt token 
//check timestamp
//check if expired
//return boolean
export const isTokenExpired = (token: string) => {
  const decoded = jwt.decode(token);
  const exp = decoded['exp'];
  const now = Math.floor(Date.now() / 1000);
  if (exp < now) {
    return true;
  }
  return false;
}
