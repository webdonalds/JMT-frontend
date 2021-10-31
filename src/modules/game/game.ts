import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
export const CONNECT_REQUEST = 'CONNECT_REQUEST';
export const CONNECTED = 'CONNECTED';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const READY_STATUS_CHANGED = 'READY_STATUS_CHANGED';
export const CHANGE_MY_READY_STATUS = 'CHANGE_MY_READY_STATUS';

// Action generator
export const connectRequest = createAction(
  CONNECT_REQUEST,
  (token: string | null) => ({
    token: token
  })
)();
export const connected = createAction(
  CONNECTED,
  (token: string) => ({ 
    token: token 
  })
)();
export const registerRequest = createAction(
  REGISTER_REQUEST,
  (nickname: string, present: string) => ({
    nickname: nickname,
    present: present
  })
)();
export const readyStatusChanged = createAction(
  READY_STATUS_CHANGED,
  (users: string[], readiedUsers: string[]) => ({
    users: users,
    readiedUsers: readiedUsers
  })
)();
export const changeMyReadyStatus = createAction(
  CHANGE_MY_READY_STATUS,
  (ready: boolean) => ({
    ready: ready
  })
)();

const actions = { connectRequest, connected, registerRequest, readyStatusChanged, changeMyReadyStatus };
export type GameActions = ActionType<typeof actions>;

// State
export enum RoomStatus {
  CONNECTED,
  REGISTER,
  START,
  FINISHED,
}

export type AuthInfo = {
  token: string,
  name: string,
};

export type GameStatus = {
  roomStatus: RoomStatus,
  users: string[],
  readiedUsers: string[],
  currentPresentInfo: PresentInfo | null,
}

type PresentInfo = {
  giverName: string,
  receiverName: string,
  present: string,
  opened: boolean,
}

type GameState = {
  auth: AuthInfo | null,
  status: GameStatus | null,
};

const initialGameState = {
  auth: null,
  status: null,
};

// Reducer
const gameReducer = createReducer<GameState, GameActions>(initialGameState, {
  [CONNECTED]: (_, action) => ({
    auth: {
      token: action.payload.token,
      name: "",
    },
    status: {
      roomStatus: RoomStatus.CONNECTED,
      users: [],
      readiedUsers: [],
      currentPresentInfo: null,
    },
  }),
  [REGISTER_REQUEST]: (state, action) => {
    if (state.auth == null) {
      return state
    }
    return {
      ...state,
      auth: {
        token: state.auth.token,
        name: action.payload.nickname
      }
    }
  },
  [READY_STATUS_CHANGED]: (state, action) => ({
    ...state,
    status: {
      roomStatus: RoomStatus.REGISTER,
      users: action.payload.users,
      readiedUsers: action.payload.readiedUsers,
      currentPresentInfo: null,
    }
  })
});

export default gameReducer;
