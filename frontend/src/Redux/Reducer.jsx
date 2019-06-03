export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return ({
        ...state,
        players: [
          ...action.players,
        ],
      });
    case 'ADD_GAMES':
      return ({
        ...state,
        games: [
          ...action.games,
        ],
      });
    case 'FETCH_LOADING':
      return ({
        ...state,
        loading: action.loading,
      });
    case 'FETCH_ERROR':
      return ({
        ...state,
        error: action.error,
      });
    default:
      return state;
  }
};
