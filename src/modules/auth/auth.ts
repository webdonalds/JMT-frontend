import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

type LoginErrorResponse = any;


// Action generator
export const loginRequest = createAction(LOGIN_REQUEST)();
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (id: string) => id,
)();
export const loginError = createAction(
  LOGIN_ERROR,
  (error: LoginErrorResponse) => error,
)();

const actions = { loginRequest, loginSuccess, loginError };
export type AuthAction = ActionType<typeof actions>;


// State
type AuthState = {
  id: string | null,
  error: LoginErrorResponse | null,
}

const initialState: AuthState = {
  id: null,
  error: null,
};


const auth = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN_REQUEST]: state => state,
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    bearerToken: action.payload,
    error: null,
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    bearerTokean: null,
    error: action.payload,
  })
});

export default auth;