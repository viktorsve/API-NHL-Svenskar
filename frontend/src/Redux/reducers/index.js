import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import playerReducer from './playerReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  player: playerReducer,
});
