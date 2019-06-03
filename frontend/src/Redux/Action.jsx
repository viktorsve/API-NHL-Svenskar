import axios from 'axios';

// Action creator that returns an action object
export const addPlayers = items => ({
  type: 'ADD_PLAYERS',
  players: items,
});

// Action creator that returns an action object
export const addGames = items => ({
  type: 'ADD_GAMES',
  games: items,
});

// Action creator that returns an action object
export const fetchLoading = bool => ({
  type: 'FETCH_LOADING',
  loading: bool,
});

// Action creator that returns an action object
export const fetchError = bool => ({
  type: 'FETCH_ERROR',
  error: bool,
});

// Using redux-thunk we can make our action creator return a
// function instead of an action object. This allows us to make asynchronous
// calls that we will dispatch the relevant data to our redux store when it is ready.
export const fetchPlayers = url => (dispatch) => {
  dispatch(fetchLoading(true));
  axios.get(url)
    .then((response) => {
      const items = response.data.teams.map(dat => dat);
      const swePlayers = [];
      for (let i = 0; i < items.length; i += 1) {
        for (let x = 0; x < items[i].roster.roster.length; x += 1) {
          if (items[i].roster.roster[x].person.nationality === 'SWE') {
            swePlayers.push(items[i].roster.roster[x].person);
          }
        }
      }
      dispatch(addPlayers(swePlayers));
      dispatch(fetchLoading(false));
    })
    /* eslint-disable no-unused-vars */
    .catch((error) => {
      /* eslint-enable no-unused-vars */
      dispatch(fetchError(true));
    });
};

// Using redux-thunk we can make our action creator return a
// function instead of an action object. This allows us to make asynchronous
// calls that we will dispatch the relevant data to our redux store when it is ready.
export const fetchGames = url => (dispatch) => {
  dispatch(fetchLoading(true));
  axios.get(url)
    .then((response) => {
      const items = response.data.dates.map(dat => dat);
      const results = items.reverse();
      const games = [];
      let counter = 0;
      for (let i = 0; i < results.length; i += 1) {
        for (let x = 0; x < results[i].games.length; x += 1) {
          if (counter < 28) {
            games.push(results[i].games[x]);
            counter += 1;
          }
        }
      }
      dispatch(addGames(games));
      dispatch(fetchLoading(false));
    })
    /* eslint-disable no-unused-vars */
    .catch((error) => {
      /* eslint-enable no-unused-vars */
      dispatch(fetchError(true));
    });
};
