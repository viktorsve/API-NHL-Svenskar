import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import { fetchGames } from '../../Redux/Action';
import styles from './LatestResultsComponent.module.css';

// Component used for displaying results
class LatestResultsComponent extends Component {
  static propTypes = {
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchGames: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
  };

  state = {
    data: [],
  }

  /* eslint-disable react/destructuring-assignment */
  /* eslint-disable max-len */

  // Fetching data from the NHL API with two parameters based on todays date.
  componentDidMount() {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const res = today.toISOString().slice(0, 10).replace(/-/g, '-');
    const days = new Date();
    days.setDate(days.getDate() - 30);
    const resDays = days.toISOString().slice(0, 10).replace(/-/g, '-');
    const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${resDays}&endDate=${res}`;
    this.props.fetchGames(url);
    axios.get('https://statsapi.web.nhl.com/api/v1/teams/')
      .then((response) => {
        this.setState({
          data: response.data.teams,
        });
      });
  }

  // Returns the correct team abbreviation
  getAbbrevation = (teamID) => {
    for (let x = 0; x < this.state.data.length; x += 1) {
      if (teamID === this.state.data[x].id) {
        return this.state.data[x].abbreviation;
      }
    }
    return false;
  }

  // Returns a different logo based on the paramter teamID
  getLogo = teamID => `https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-${teamID}-dark.svg`

  // Lifecycle method that render our JSX code into the DOM
  render() {
    const { games, error } = this.props;
    return (
      <CardDeck style={{ margin: '30px' }}>
        {error && <p>Error fetching.</p>}
        <div className={`${styles.row} row`}>
          {games.map(game => (
            <div key={game.gamePk} className="col-lg-3">
              <Card className={styles.card} bg="dark" text="white">
                <Card.Body>
                  <Card.Title>
                    <img src={this.getLogo(game.teams.home.team.id)} alt="Laglogotyp" />
                    {this.getAbbrevation(game.teams.home.team.id)}
                    {game.teams.home.score || game.teams.away.score !== 0 ? <span>{game.teams.home.score}</span> : <span />}
                  </Card.Title>
                  <Card.Title>
                    <img src={this.getLogo(game.teams.away.team.id)} alt="Laglogotyp" />
                    {this.getAbbrevation(game.teams.away.team.id)}
                    {game.teams.home.score || game.teams.away.score !== 0 ? <span>{game.teams.away.score}</span> : <span />}
                  </Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{game.gameDate}</small>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </CardDeck>
    );
  }
}

// Connects our component with the data in our Redux store
function mapStateToProps(state) {
  return {
    games: state.games,
    error: state.error,
  };
}

// Used for dispatching actions to our store
const mapDispatchToProps = {
  fetchGames,
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestResultsComponent);
