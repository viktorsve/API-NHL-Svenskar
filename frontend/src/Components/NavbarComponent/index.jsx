import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../Redux/actions/authActions';

import styles from './NavbarComponent.module.css';
import logo from '../../Assets/nhl-logo.png';

// Component that renders a navigation bar.
class NavbarComponent extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    localStorage.clear();
  };

  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        className={styles.navStyle}
        expand="sm"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              className={styles.logoStyle}
              alt="Svenskifierad NHL-logotyp"
            />
          </NavLink>
          <Nav className="mr-auto">
            <NavLink className="nav-link ml-3" to="/spelare">Spelare</NavLink>
            <NavLink className="nav-link ml-3" to="/tabell">Tabell</NavLink>
            <NavLink className="nav-link ml-3" to="/resultat">Resultat</NavLink>
          </Nav>
          <Nav className="ml-auto right">
            {this.props.auth.isAuthenticated ? (
              <Nav>
                <NavLink className="nav-link ml-3 right" to="/dashboard">Mitt konto</NavLink>
                <NavLink className="nav-link ml-3 right" to="/login" onClick={this.onLogoutClick}>Logga ut</NavLink>
              </Nav>
            ) : (
              <NavLink className="nav-link ml-3 right" to="/login">Logga in</NavLink>
            )}
          </Nav>
          <Form inline className={`${styles.form} form`}>
            <FormControl type="text" placeholder="Sök" className="mr-sm-2" />
            <Button variant="outline-secondary">Sök</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(NavbarComponent);
