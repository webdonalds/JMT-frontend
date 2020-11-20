import { createAction, ActionType, createReducer } from 'typesafe-actions';

export const timeoutMilliSecond = 10000;

// Action type
const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_TIMEOUT = 'auth/LOGIN_TIMEOUT';


// Action generator
export const loginRequest = createAction(LOGIN_REQUEST)();
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  (nickname: string, token: string) => ({nickname: nickname, token: token}),
)();
export const loginTimeout = createAction(LOGIN_TIMEOUT)();

const actions = { loginRequest, loginSuccess, loginTimeout };
export type AuthAction = ActionType<typeof actions>;


// State
enum AuthResponseStatus {
  NONE,
  WAIT,
  SUCCESS,
}

type AuthState = {
  token: string,
  nickname: string,
  responseStatus: AuthResponseStatus,
}

const initialState: AuthState = {
  token: "",
  nickname: "",
  responseStatus: AuthResponseStatus.NONE,
};


const auth = createReducer<AuthState, AuthAction>(initialState, {
  [LOGIN_REQUEST]: state => ({
    ...state,
    responseStatus: AuthResponseStatus.WAIT,
  }),
  [LOGIN_SUCCESS]: (_, action) => ({
    token: action.payload.token,
    nickname: action.payload.nickname,
    responseStatus: AuthResponseStatus.SUCCESS
  }),
  [LOGIN_TIMEOUT]: state => {
    // TODO: request에 대한 response가 바로 날아오는 것이 아니여서, 현재는 항상 TIMEOUT 요청은 날리되 대기중이 아니면 무시.
    // TODO: 추후에 redux-saga와 같은 라이브러리를 사용해서 수정.
    if(state.responseStatus != AuthResponseStatus.WAIT) {
      return state;
    }

    return {
      token: "",
      nickname: "",
      responseStatus: AuthResponseStatus.NONE,
    };
  }
});

export default auth;