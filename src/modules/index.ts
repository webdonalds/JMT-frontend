import { combineReducers } from 'redux';
import gameReducer from './game/game';

const rootReducer = combineReducers({ game: gameReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
