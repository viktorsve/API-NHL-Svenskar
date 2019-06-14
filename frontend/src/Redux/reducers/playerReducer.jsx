import {
  ADD_PLAYERS,
  ADD_GAMES,
  FETCH_LOADING,
  FETCH_ERROR,
} from '../actions/types';

const initialState = {
  players: [],
  games: [],
  loading: false,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYERS:
      return ({
        ...state,
        players: [
          ...action.players,
        ],
      });
    case ADD_GAMES:
      return ({
        ...state,
        games: [
          ...action.games,
        ],
      });
    case FETCH_LOADING:
      return ({
        ...state,
        loading: action.loading,
      });
    case FETCH_ERROR:
      return ({
        ...state,
        error: action.error,
      });
    default:
      return state;
  }
};
