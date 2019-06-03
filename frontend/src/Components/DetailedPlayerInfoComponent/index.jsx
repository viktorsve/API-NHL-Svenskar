import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './DetailedPlayerInfoComponent.module.css';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */

// Component that renders detailed statistics about one player over his whole career.
class DetailedPlayerInfoComponent extends Component {
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
      detailedPlayerInfo: null,
      errorState: null,
    };
  }

  // Fetching data from NHL API and storing it to our local state.
  componentDidMount() {
    const specificPlayerID = this.props.match.params.cell;

    axios.get(`https://statsapi.web.nhl.com/api/v1/people/${specificPlayerID}/?expand=person.stats&stats=yearByYear`)
      .then((res) => {
        const detailedPlayerInfo = res.data;
        this.setState({ detailedPlayerInfo });
      })
      .catch((error) => {
        const errorState = error.message;
        this.setState({ errorState });
      });
  }

  render() {
    const { detailedPlayerInfo, errorState } = this.state;

    if (!detailedPlayerInfo) {
      return <p>{errorState}</p>;
    }

    const reverseStatsArray = detailedPlayerInfo.people[0].stats[0].splits;

    // Inserting an hyphen between two years in season string.
    const insertFunc = (str, txt = '-', pos = 4) => {
      const text = str.slice(0, pos);
      const text2 = str.slice(pos);
      return text + txt + text2;
    };

    // Changing the order of the array so that the most recent season displays atop.
    const compare = (a, b) => {
      const seasonA = a.season;
      const seasonB = b.season;
      let comparison = 0;
      if (seasonA > seasonB) {
        comparison = 1;
      } else if (seasonA < seasonB) {
        comparison = -1;
      }
      return comparison * -1;
    };

    reverseStatsArray.sort(compare);

    const insertHyphen = reverseStatsArray.map(year => insertFunc(year.season));

    const playerPosition = detailedPlayerInfo.people[0].primaryPosition.type;

    return (
      <div className={styles.tableWrapper}>
        <Table striped borderless hover variant="dark" className={styles.table}>
          <thead className="sticky-top">
            {playerPosition === 'Goalie'
              ? (
                <tr className={styles.borderBottom}>
                  <th className="sticky-top">Säsong</th>
                  <th className="sticky-top">Lag</th>
                  <th className="sticky-top">Liga</th>
                  <th className="sticky-top">Matcher</th>
                  <th className="sticky-top">Insläppta mål</th>
                  <th className="sticky-top">Räddningsprocent</th>
                  <th className="sticky-top">Räddningar</th>
                  <th className="sticky-top">Antal skott</th>
                  <th className="sticky-top">Hållna nollor</th>
                </tr>
              )
              : (
                <tr className={styles.borderBottom}>
                  <th className="sticky-top">Säsong</th>
                  <th className="sticky-top">Lag</th>
                  <th className="sticky-top">Liga</th>
                  <th
                    className="sticky-top"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Utvisningsminuter"
                  >
                  UM
                  </th>
                  <th className="sticky-top">+/-</th>
                  <th className="sticky-top">Matcher</th>
                  <th className="sticky-top">Mål</th>
                  <th className="sticky-top">Assist</th>
                  <th className="sticky-top">Poäng</th>
                </tr>
              )
          }
          </thead>

          <tbody>
            {playerPosition === 'Goalie' ? detailedPlayerInfo.people[0].stats[0].splits.map((player, i) => (
              <tr key={i} className={styles.borderBottom}>
                <td>{insertHyphen[i]}</td>
                <td>{player.team.name}</td>
                <td>{player.league.name}</td>
                <td>{player.stat.games}</td>
                <td>{player.stat.goalAgainstAverage}</td>
                <td>{player.stat.savePercentage}</td>
                <td>{player.stat.evenSaves}</td>
                <td>{player.stat.evenShots}</td>
                <td>{player.stat.shutouts}</td>
              </tr>
            )) : detailedPlayerInfo.people[0].stats[0].splits.map((player, i) => (
              <tr key={i} className={styles.borderBottom}>
                <td>{insertHyphen[i]}</td>
                <td>{player.team.name}</td>
                <td>{player.league.name}</td>
                <td>{player.stat.pim}</td>
                <td>{player.stat.plusMinus}</td>
                <td>{player.stat.games}</td>
                <td>{player.stat.goals}</td>
                <td>{player.stat.assists}</td>
                <td>{player.stat.points}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(DetailedPlayerInfoComponent);
