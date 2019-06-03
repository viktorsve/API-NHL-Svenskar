import React, { Component, Fragment } from 'react';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import styles from './StandingsComponent.module.css';

/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */

// Component that renders team standings.
export default class StandingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      byLeague: [],
      byWestern: [],
      byEastern: [],
      showLeague: true,
      showWestern: false,
    };
  }

  // Fetches the standings data from the API
  componentDidMount() {
    axios.get('https://statsapi.web.nhl.com/api/v1/standings/byLeague')
      .then((result) => {
        const items = result.data.records[0].teamRecords.map(team => team);
        const teams = [];
        for (let i = 0; i < items.length; i += 1) {
          teams.push(items[i]);
        }
        this.setState({
          byLeague: teams,
        });
      });
    axios.get('https://statsapi.web.nhl.com/api/v1/standings/byConference')
      .then((result) => {
        const westernItems = result.data.records[1].teamRecords;
        const westernTeams = [];
        for (let i = 0; i < westernItems.length; i += 1) {
          westernTeams.push(westernItems[i]);
        }
        const easternItems = result.data.records[0].teamRecords;
        const easternTeams = [];
        for (let i = 0; i < easternItems.length; i += 1) {
          easternTeams.push(easternItems[i]);
        }
        this.setState({
          byWestern: westernTeams,
          byEastern: easternTeams,
        });
      });
  }

  // Formatter that returns the teams logo
  getTeamLogo = (id) => {
    const src = 'https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-';
    return (
      <img src={`${src + id}-dark.svg`} alt="Laglogotyp" />
    );
  }

  // Toggle function for displaying the league standings
  showLeague = () => {
    this.setState({
      showLeague: true,
    });
  }

  // Toggle function as above - displaying the western conference standings
  showWestern = () => {
    this.setState({
      showWestern: true,
      showLeague: false,
    });
  }

  // Toggle function as above - displaying the eastern conference standings
  showEastern = () => {
    this.setState({
      showWestern: false,
      showLeague: false,
    });
  }

  render() {
    const {
      byLeague, byWestern, byEastern,
    } = this.state;


    const leagueColumns = [{
      dataField: 'leagueRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      text: '',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'Poäng',
      sort: true,
      style: () => ({ backgroundColor: 'rgba(47, 148, 60, 0.10)', fontWeight: 'bold' }),
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    }];

    const defaultSorted = [{
      dataField: 'points',
      order: 'desc',
    }];

    const westernColumns = [{
      dataField: 'conferenceRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      text: '',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'Poäng',
      sort: true,
      style: () => ({ backgroundColor: 'rgba(47, 148, 60, 0.10)', fontWeight: 'bold' }),
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    }];

    const easternColumns = [{
      dataField: 'conferenceRank',
      text: 'Rank',
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.id',
      text: '',
      formatter: this.getTeamLogo,
      headerStyle: () => ({ width: '100px' }),
    }, {
      dataField: 'team.name',
      text: 'Lag',
      sort: true,
      headerStyle: () => ({ width: '200px' }),
      style: () => ({ textAlign: 'left', paddingLeft: '20px' }),
    }, {
      dataField: 'gamesPlayed',
      text: 'GP',
      sort: true,
    }, {
      dataField: 'leagueRecord.wins',
      text: 'W',
      sort: true,
    }, {
      dataField: 'leagueRecord.losses',
      text: 'L',
      sort: true,
    }, {
      dataField: 'leagueRecord.ot',
      text: 'OT',
      sort: true,
    }, {
      dataField: 'points',
      text: 'Poäng',
      sort: true,
      style: () => ({ backgroundColor: 'rgba(47, 148, 60, 0.10)', fontWeight: 'bold' }),
    }, {
      dataField: 'goalsScored',
      text: 'G',
      sort: true,
    }, {
      dataField: 'goalsAgainst',
      text: 'GA',
      sort: true,
    }];

    return (
      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} style={{ marginRight: '5px', borderRadius: '4px' }} onChange={this.showLeague}>Hela ligan</ToggleButton>
            <ToggleButton variant="secondary" value={2} style={{ marginRight: '5px', borderRadius: '4px' }} onChange={this.showWestern}>Västra konferensen</ToggleButton>
            <ToggleButton variant="secondary" value={3} style={{ borderRadius: '4px' }} onChange={this.showEastern}>Östra konferensen</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {this.state.showLeague
          ? (
            <BootstrapTable
              bootstrap4
              classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
              keyField="team.id"
              data={byLeague}
              columns={leagueColumns}
              defaultSorted={defaultSorted}
            />
          ) : (this.state.showWestern ? (
            <Fragment>
              <h3>Västra konferensen</h3>
              <BootstrapTable
                bootstrap4
                classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
                keyField="team.id"
                data={byWestern}
                columns={westernColumns}
                defaultSorted={defaultSorted}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h3>Östra konferensen</h3>
              <BootstrapTable
                bootstrap4
                classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
                keyField="team.id"
                data={byEastern}
                columns={easternColumns}
                defaultSorted={defaultSorted}
              />
            </Fragment>
          )
          )}
        <h4>Förkortningar:</h4>
        <h5>
          <strong>GP: </strong>

            Spelade matcher
        </h5>
        <h5>
          <strong>W: </strong>

            Vinster
        </h5>
        <h5>
          <strong>L: </strong>

            Förluster
        </h5>
        <h5>
          <strong>OT: </strong>

            Overtime
        </h5>
        <h5>
          <strong>Points: </strong>

            Poäng
        </h5>
        <h5>
          <strong>G: </strong>

            Mål
        </h5>
        <h5>
          <strong>GA: </strong>

            Insläppta mål
        </h5>
      </div>
    );
  }
}
