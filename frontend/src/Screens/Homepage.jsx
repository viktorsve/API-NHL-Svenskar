import React, { Component, Fragment } from 'react';
import GameScheduleComponent from '../Components/GameScheduleComponent';

import NewsFeedComponent from '../Components/NewsFeedComponent';


class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <GameScheduleComponent />
        <NewsFeedComponent />
      </Fragment>
    );
  }
}

export default Homepage;
