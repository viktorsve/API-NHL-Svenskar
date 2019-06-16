import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import styles from './AccountComponent.module.css';
/* eslint-disable react/destructuring-assignment */
class AccountComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedPlayers: null,
    };
  }

  componentDidMount() {
    // Måste lägga till vilken user som är inloggad i pathen, hämtat från localstorage.
    // const username = localStorage.getItem('username');

    axios.get('http://localhost:2000/students').then((res) => {
      this.setState({
        likedPlayers: res.data,
      });
    });
  }

  render() {
    if (!this.state.likedPlayers) {
      return <p>BLABLA</p>;
    }
    return (
      <div className={styles.accoutWrapper}>
        <Card className={styles.cardStyle}>
          <i className={`fas fa-user ${styles.fontStyle}`} />
          <Card.Body>
            <Card.Title>{this.state.likedPlayers[0].username}</Card.Title>
            <Card.Text>
              Välkommen till ditt konto.
            </Card.Text>
          </Card.Body>
        </Card>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Gillamarkeringar</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.likedPlayers.map((player, i) => (
                <tr key={i}>
                  <td><NavLink to={`/spelare/${player.likedPlayers[0].playerId}`}>{player.likedPlayers[0].name}</NavLink></td>
                </tr>
              ))
            }

          </tbody>
        </Table>
      </div>
    );
  }
}

export default AccountComponent;
