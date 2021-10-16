import { createAction, ActionType, createReducer } from 'typesafe-actions';

// Action type
const CONNECT_REQUEST = 'CONNECT_REQUEST';
const CONNECT = 'CONNECT';

// Action generator
export const connectRequest = createAction(
  CONNECT_REQUEST,
  (token: string | null) => ({
    token: token
  })
)();
export const connect = createAction(
  CONNECT,
  (token: string) => ({ 
    token: token 
  })
)();

const actions = { connectRequest, connect };
export type GameActions = ActionType<typeof actions>;

// State
export enum RoomStatus {
  CONNECT,
  REGISTER,
  READY,
  START,
  FINISHED,
}

type AuthInfo = {
  token: string,
  name: string,
};

type PresentInfo = {
  giverName: string,
  receiverName: string,
  present: string,
  opened: boolean,
}

type GameState = {
  auth: AuthInfo | null,
  status: {
    roomStatus: RoomStatus,
    currentPresentInfo: PresentInfo | null,
  } | null,
};

const initialGameState = {
  auth: null,
  status: null,
};

// Reducer
const gameReducer = createReducer<GameState, GameActions>(initialGameState, {
  [CONNECT]: (_, action) => ({
    auth: {
      token: action.payload.token,
      name: "",
    },
    status: {
      roomStatus: RoomStatus.CONNECT,
      currentPresentInfo: null,
    },
  }),
});

export default gameReducer;
