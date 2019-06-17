import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './DashboardComponent.module.css';
import { logoutUser } from '../../Redux/actions/authActions';

/* eslint-disable react/destructuring-assignment */

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');

    axios.get(`https://nhl-backend.herokuapp.com/login/${username}`).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  }

  render() {
    if (!this.state.user) {
      return <p>BLABLA</p>;
    }

    return (
      <div className={styles.accoutWrapper}>
        <Card className={styles.cardStyle}>
          <i className={`fas fa-user ${styles.fontStyle}`} />
          <Card.Body>
            <Card.Title>{this.state.user.username}</Card.Title>
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

            { this.state.user.likedPlayers.map((player, i) => (
              <tr key={i}>
                <td>
                  <NavLink to={`/spelare/${player.playerId}`}>
                    {player.name}
                  </NavLink>
                </td>
              </tr>
            ))

            }


          </tbody>

        </Table>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(Dashboard);
