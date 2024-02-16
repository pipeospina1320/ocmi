'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios from '../../utils/axios';
import { ActionMapType, AuthStateType, AuthUserType } from '../types';
import { getToken, isValidToken, setSession } from './utils';
import { AuthContext } from './auth-context';
import { endpoints } from '../../api/endpoints';
import { useGetUser } from '../../api/auth/auth';

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const tokenStored = getToken();

  const { data: getUser } = useGetUser(tokenStored);

  const initialize = useCallback(async () => {
    try {
      if (tokenStored && isValidToken(tokenStored)) {
        setSession(tokenStored);

        const { user } = getUser;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken: tokenStored,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };

    const res = await axios.post(endpoints.auth.login, data);

    const { token, user } = res.data;

    setSession(token);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken: token,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
    ) => {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { accessToken, user } = res.data;

      setSession(accessToken);

      dispatch({
        type: Types.REGISTER,
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      });
    },
    [],
  );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
    }),
    [login, register, state.user, status],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
