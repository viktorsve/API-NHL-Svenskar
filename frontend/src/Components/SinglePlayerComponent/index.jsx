import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './SinglePlayerComponent.module.css';
import DetailedPlayerInfoComponent from '../DetailedPlayerInfoComponent';

// Component for rendering info and images of one specific player.
/* eslint-disable react/destructuring-assignment */
class SinglePlayerComponent extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        cell: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    match: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      starOrNot: true,
      singlePlayer: null,
      errorState: null,
      likes: 0,
    };
  }

  componentDidMount() {
    const specificPlayerID = this.props.match.params.cell;
    console.log(this.props);

    // Hämta användaren och styr vilken stjräna som ska visas, typ.
    const username = localStorage.getItem('username');

    axios.get(`https://nhl-backend.herokuapp.com/login/${username}`).then((res) => {
      if (this.props.auth.isAuthenticated) {
        for (let i = 0; i < res.data.likedPlayers.length; i++) {
          if (res.data.likedPlayers[i].playerId === specificPlayerID) {
            this.setState(prevState => ({
              starOrNot: !prevState.starOrNot,
            }));
          }
        }
      }
    });

    axios.get(`https://nhl-backend.herokuapp.com/counter/${specificPlayerID}`).then((res) => {
      if (res.data.count) {
        this.setState({
          likes: res.data.count,
        });
      }
    });

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://statsapi.web.nhl.com/api/v1/people/${specificPlayerID}/?expand=person.stats&stats=yearByYear`)
      .then((res) => {
        const singlePlayer = res.data;
        this.setState({ singlePlayer });
      })
      .catch((error) => {
        const errorState = error.message;
        this.setState({ errorState });
      });
  }

  likeOnePlayer = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
    // skapa en variabel som tar in användarens username.
    const username = localStorage.getItem('username');
    this.setState(prevState => ({
      starOrNot: !prevState.starOrNot,
      likes: prevState.likes + 1,
    }));
    const specificPlayerID = this.props.match.params.cell;
    const player = {
      id: this.state.singlePlayer.people[0].id,
      count: 1,
    };
    axios.put(`https://nhl-backend.herokuapp.com/counter/${specificPlayerID}`, player).catch(err => console.log(err));

    const playerToPost = {
      playerId: this.state.singlePlayer.people[0].id,
      name: this.state.singlePlayer.people[0].fullName,
    };
    axios.post(`https://nhl-backend.herokuapp.com/login/${username}`, playerToPost).catch(err => console.log(err));
  }


dislikeOnePlayer = () => {
  if (!this.props.auth.isAuthenticated) {
    this.props.history.push('/login');
  }
  // skapa en variabel som tar in användarens username.
  const username = localStorage.getItem('username');
  this.setState(prevState => ({
    starOrNot: !prevState.starOrNot,
    likes: prevState.likes - 1,
  }));
  const specificPlayerID = this.props.match.params.cell;
  const player = {
    id: this.state.singlePlayer.people[0].id,
    count: -1,
  };
  axios.put(`https://nhl-backend.herokuapp.com/counter/${specificPlayerID}`, player).catch(err => console.log(err));


  axios.delete(`https://nhl-backend.herokuapp.com/login/${username}`, { data: { playerId: specificPlayerID } }).catch(err => console.log(err));
}

  handleKeyEvent = () => {
    this.setState(prevState => ({
      starOrNot: !prevState.starOrNot,
    }));
  }

  render() {
    if (!this.state.singlePlayer) {
      return <p>{this.state.errorState}</p>;
    }
    /* eslint-disable react/destructuring-assignment */
    const cellString = this.props.match.params.cell;
    const cell = parseInt(cellString, 10);

    // Comparing player id from match.params.cell with the players array from our global state.
    const singlePlayer = this.state.singlePlayer.people[0];

    const actionIMG = `https://nhl.bamcontent.com/images/actionshots/${cell}.jpg`;

    const headshotIMG = `https://nhl.bamcontent.com/images/headshots/current/168x168/${cell}.jpg`;

    const teamID = singlePlayer.currentTeam.id;
    const teamLogo = `https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-${teamID}-dark.svg`;

    return (
      <div className={styles.singlePlayerWrapper}>
        <img src={actionIMG} alt="playername" className={styles.actionIMG} />
        <img src={headshotIMG} className={styles.headshotIMG} alt="playername" />
        <h3>
          <img src={teamLogo} className={styles.teamLogo} alt="Logo" />
          {singlePlayer.fullName}
          {' '}

          #
          {singlePlayer.primaryNumber}
        </h3>
        <p>
          {singlePlayer.primaryPosition.type}
          {' '}

          |
          {' Ålder: '}
          {singlePlayer.currentAge}
          {' '}

          |
          {' Född: '}
          {singlePlayer.birthCity}
          {' '}
        </p>
        <p>
          {' '}
          Favoritmarkera spelaren
          {' '}
          {
            this.state.starOrNot ? (
              <i
                className={`far fa-star ${styles.starHover}`}
                onClick={this.state.starOrNot ? this.likeOnePlayer : this.dislikeOnePlayer}
                onKeyPress={this.handleKeyEvent}
                role="button"
                tabIndex="0"
              />
            )
              : (
                <i
                  className={`fas fa-star ${styles.clickedStar}`}
                  onClick={this.state.starOrNot ? this.likeOnePlayer : this.dislikeOnePlayer}
                  onKeyPress={this.handleKeyEvent}
                  role="button"
                  tabIndex="0"
                />
              )
          }

        </p>
        <span>
          {' '}
          Antal följare
          {' '}
          <span>{this.state.likes}</span>
        </span>
        <DetailedPlayerInfoComponent />
      </div>
    );
  }
}

// Connects our component with the data in our Redux store
function mapStateToProps(state) {
  return {
    players: state.player.players,
    error: state.player.error,
    auth: state.auth,
  };
}

export default withRouter(connect(mapStateToProps, null)(SinglePlayerComponent));
