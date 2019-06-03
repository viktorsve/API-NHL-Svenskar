import React, { Component } from 'react';
import PlayersTableComponent from '../Components/PlayersTableComponent';


class Players extends Component {
  render() {
    return (
      <div className="wrapper">
        <PlayersTableComponent />
      </div>
    );
  }
}

export default Players;
