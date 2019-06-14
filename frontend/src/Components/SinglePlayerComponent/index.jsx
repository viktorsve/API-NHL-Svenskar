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
      likes: null,
    };
  }

  componentDidMount() {
    const specificPlayerID = this.props.match.params.cell;

    // Hämta användaren och styr vilken stjräna som ska visas, typ.

    axios.get(`http://localhost:2000/counter/${specificPlayerID}`).then((res) => {
      this.setState({
        likes: res.data.count,
      });
    });

    axios.get(`https://statsapi.web.nhl.com/api/v1/people/${specificPlayerID}/?expand=person.stats&stats=yearByYear`)
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
    axios.put(`http://localhost:2000/counter/${specificPlayerID}`, player).then(res => console.log(res));

    const playerToPost = {
      playerId: this.state.singlePlayer.people[0].id,
      name: this.state.singlePlayer.people[0].fullName,
    };
    axios.post(`http://localhost:2000/counter/${username}`, playerToPost).then(res => console.log(res));
  }


  dislikeOnePlayer = () => {
    // skapa en variabel som tar in användarens username.
    const username = 'pelle';
    this.setState(prevState => ({
      starOrNot: !prevState.starOrNot,
      likes: prevState.likes - 1,
    }));
    const specificPlayerID = this.props.match.params.cell;
    const player = {
      id: this.state.singlePlayer.people[0].id,
      count: -1,
    };
    axios.put(`http://localhost:2000/counter/${specificPlayerID}`, player).then(res => console.log(res));

    axios.delete(`http://localhost:2000/login/${username}`, { playerId: specificPlayerID }).then(res => console.log(res));
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
          Spara spelaren
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
    players: state.players,
    error: state.error,
  };
}

export default withRouter(connect(mapStateToProps, null)(SinglePlayerComponent));
