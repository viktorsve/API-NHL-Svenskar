import React, { Component, Fragment } from 'react';
import GameScheduleComponent from '../Components/GameScheduleComponent';
import AccountComponent from '../Components/AccountComponent';

import NewsFeedComponent from '../Components/NewsFeedComponent';


class Homepage extends Component {
  render() {
    return (
      <Fragment>
        <AccountComponent />
        <GameScheduleComponent />
        <NewsFeedComponent />
      </Fragment>
    );
  }
}

export default Homepage;
