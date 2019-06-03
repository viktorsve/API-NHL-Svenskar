import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styles from './GameScheduleComponent.module.css';

// Component used for showing recent results on the homepage
class GameScheduleComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dates: [],
    };
    this.settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      arrows: false,
      responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2, slidesToScroll: 2, infinite: false },
        },
      ],
    };
  }

  // Fetching data from the NHL API with two parameters based on todays date.
  componentDidMount() {
    const today = new Date();
    const res = today.toISOString().slice(0, 10).replace(/-/g, '-');
    const days = new Date();
    days.setDate(days.getDate() - 5);
    const resDays = days.toISOString().slice(0, 10).replace(/-/g, '-');
    axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?startDate=${resDays}&endDate=${res}`)
      .then((response) => {
        const items = response.data.dates.map(dat => dat);
        const results = items.reverse();
        const dates = [];
        let counter = 0;
        for (let i = 0; i < results.length; i += 1) {
          for (let x = 0; x < results[i].games.length; x += 1) {
            if (results[i].games[x].status.abstractGameState === 'Final') {
              if (counter < 10) {
                dates.push(results[i].games[x]);
                counter += 1;
              }
            }
          }
        }
        this.setState({
          dates,
        });
      });
    axios.get('https://statsapi.web.nhl.com/api/v1/teams/')
      .then((response) => {
        this.setState({
          data: response.data.teams,
        });
      });
  }

  /* eslint-disable react/destructuring-assignment */
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
    return (
      <Slider {...this.settings}>
        {this.state.dates.map(team => (
          <div key={team.link} className={styles.card}>
            <div className={styles.cardbox}>
              <img src={this.getLogo(team.teams.home.team.id)} alt="logo" />
              <h4>{this.getAbbrevation(team.teams.home.team.id)}</h4>
              <h4 className={styles.score}>{team.teams.home.score}</h4>
            </div>
            <div className={styles.cardbox}>
              <img src={this.getLogo(team.teams.away.team.id)} alt="logo" />
              <h4>{this.getAbbrevation(team.teams.away.team.id)}</h4>
              <h4 className={styles.score}>{team.teams.away.score}</h4>
            </div>
          </div>
        ))}
      </Slider>
    );
  }
}
/* eslint-enable react/destructuring-assignment */

export default GameScheduleComponent;
