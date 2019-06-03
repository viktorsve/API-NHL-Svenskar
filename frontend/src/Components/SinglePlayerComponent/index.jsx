import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import styles from './SinglePlayerComponent.module.css';
import DetailedPlayerInfoComponent from '../DetailedPlayerInfoComponent';

// Component for rendering info and images of one specific player.
class SinglePlayerComponent extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        cell: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    match: {},
  }

  render() {
    /* eslint-disable react/destructuring-assignment */
    const cellString = this.props.match.params.cell;
    const cell = parseInt(cellString, 10);

    // Comparing player id from match.params.cell with the players array from our global state.
    const singlePlayer = this.props.players.find(onePlayer => onePlayer.id === cell);

    if (!singlePlayer) {
      return <DetailedPlayerInfoComponent />;
    }

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
