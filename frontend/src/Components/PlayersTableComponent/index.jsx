import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { fetchPlayers } from '../../Redux/Action';
import './PlayersTableComponent.css';

// Component used for rendering our table of players
class PlayersTableComponent extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
  };

  state = {
    showGoalie: false,
  }

  /* eslint-disable react/destructuring-assignment */
  // Runs when the component is mounted to the DOM
  componentDidMount = () => {
    this.props.fetchPlayers('https://statsapi.web.nhl.com/api/v1/teams/?hydrate=roster(person(stats(splits=statsSingleSeason)))');
  }

  // Column formatter with custom data used for creating clickable navlinks
  getLinks = (cell, row) => (
    <NavLink to={`/spelare/${row.id}`} style={{ color: 'lightblue' }}>{cell}</NavLink>
  )

  // Column formatter with custom data used for displaying team logos instead of team IDs
  getLogo = (cell) => {
    const source = 'https://www-league.nhlstatic.com/nhl.com/builds/site-core/a2d98717aeb7d8dfe2694701e13bd3922887b1f2_1542226749/images/logos/team/current/team-';
    return (
      <img style={{ width: 25, height: 25 }} src={`${source + cell}-dark.svg`} alt="Laglogotyp" />
    );
  }

  // Column formatter with custom data that displays the swedish word for each position
  getPosition = (cell) => {
    if (cell === 'Defenseman') {
      return (
        <span>Back</span>
      );
    }

    if (cell === 'Goalie') {
      return (
        <span>Målvakt</span>
      );
    }

    return (
      <span>{ cell }</span>
    );
  }

  // Method that runs the function fetchPlayers that is passed through props
  fetchPlayoffs = () => {
    if (this.props.players[0].stats[0].type.displayName === 'statsSingleSeason') {
      this.props.fetchPlayers('https://statsapi.web.nhl.com/api/v1/teams/?hydrate=roster(person(stats(splits=statsSingleSeasonPlayoffs)))');
    }
  }

  // Same as above only with a different url that fetches regular season stats
  fetchRegular = () => {
    if (this.props.players[0].stats[0].type.displayName === 'statsSingleSeasonPlayoffs') {
      this.props.fetchPlayers('https://statsapi.web.nhl.com/api/v1/teams/?hydrate=roster(person(stats(splits=statsSingleSeason)))');
    }
  }

  // Text filter used for filtering out certain values in our table
  filterAll = () => {
    this.setState({
      showGoalie: false,
    });
    this.textFilter('');
  }

  // Text filter used for filtering out certain values in our table
  filterForwards = () => {
    this.setState({
      showGoalie: false,
    });
    this.textFilter('Forward');
  }

  // Text filter used for filtering out certain values in our table
  filterDefensemen = () => {
    this.setState({
      showGoalie: false,
    });
    this.textFilter('Defenseman');
  }

  // Text filter used for filtering out certain values in our table
  filterGoalies = () => {
    this.setState({
      showGoalie: true,
    });
    this.textFilter('Goalie');
  }

  // Lifecycle method that render our JSX code into the DOM
  render() {
    const { players, error } = this.props;
    const columns = [{
      dataField: 'fullName',
      text: 'Namn',
      formatter: this.getLinks,
      sort: true,
    }, {
      dataField: 'currentTeam.id',
      text: 'Lag',
      formatter: this.getLogo,
      sort: true,
    }, {
      dataField: 'primaryPosition.type',
      text: 'Position',
      sort: true,
      filter: textFilter({
        getFilter: (filter) => {
          this.textFilter = filter;
        },
      }),
      formatter: this.getPosition,
    }, {
      dataField: 'currentAge',
      text: 'Ålder',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.games',
      text: 'Matcher',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.goals',
      text: 'Mål',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.assists',
      text: 'Assist',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.points',
      text: 'Poäng',
      sort: true,
    }];
    const defaultSorted = [{
      dataField: 'stats[0].splits[0].stat.points',
      order: 'desc',
    }];
    const columnsGoalie = [{
      dataField: 'fullName',
      text: 'Namn',
      formatter: this.getLinks,
      sort: true,
    }, {
      dataField: 'currentTeam.id',
      text: 'Lag',
      formatter: this.getLogo,
      sort: true,
    }, {
      dataField: 'primaryPosition.type',
      text: 'Position',
      sort: true,
      filter: textFilter({
        getFilter: (filter) => {
          this.textFilter = filter;
        },
      }),
      formatter: this.getPosition,
    }, {
      dataField: 'currentAge',
      text: 'Ålder',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.games',
      text: 'Spelade Matcher',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.saves',
      text: 'Räddningar',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.goalAgainstAverage',
      text: 'Insläppta mål per match',
      sort: true,
    }, {
      dataField: 'stats[0].splits[0].stat.savePercentage',
      text: 'Räddningsprocent',
      sort: true,
    }];
    const defaultSortedGoalie = [{
      dataField: 'stats[0].splits[0].stat.savePercentage',
      order: 'desc',
    }];
    return (
      <div className="tablewrapper">
        <div className="buttonwrapper">
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} onChange={this.fetchRegular}>Grundserie</ToggleButton>
            <ToggleButton variant="secondary" value={2} onChange={this.fetchPlayoffs}>Slutspel</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="secondary" value={1} onChange={this.filterAll}>Alla Spelare</ToggleButton>
            <ToggleButton variant="secondary" value={2} onChange={this.filterForwards}>Forwards</ToggleButton>
            <ToggleButton variant="secondary" value={3} onChange={this.filterDefensemen}>Backar</ToggleButton>
            <ToggleButton variant="secondary" value={4} onChange={this.filterGoalies}>Målvakter</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {error && <p>Error fetching.</p>}
        {!this.state.showGoalie ? (
          <BootstrapTable
            bootstrap4
            classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
            keyField="id"
            data={players}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={paginationFactory()}
            filter={filterFactory()}
          />
        ) : (
          <BootstrapTable
            bootstrap4
            classes="table text-center table-hover table-bordered table-striped table-dark table-borderless"
            keyField="id"
            data={players}
            columns={columnsGoalie}
            defaultSorted={defaultSortedGoalie}
            pagination={paginationFactory()}
            filter={filterFactory()}
          />
        )}
      </div>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

// Connects our component with the data in our Redux store
function mapStateToProps(state) {
  return {
    players: state.players,
    error: state.error,
  };
}

// Used for dispatching actions to our store
const mapDispatchToProps = {
  fetchPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersTableComponent);
