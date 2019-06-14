import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './private-route/PrivateRoute';
import Dashboard from './Components/DashboardComponent/Dashboard';
import { setCurrentUser, logoutUser } from './Redux/actions/authActions';
import store from './store';
import Homepage from './Screens/Homepage';
import Player from './Screens/Player';
import Players from './Screens/Players';
import Results from './Screens/Results';
import Standings from './Screens/Standings';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import Register from './Components/AuthComponent/Register';
import Login from './Components/AuthComponent/Login';
import './App.css';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { loading } = this.props;
    return (
      <Provider store={store}>
        <LoadingOverlay
          active={loading}
          spinner
          styles={{
            overlay: base => ({
              ...base,
              position: 'fixed',
              overflow: 'visible',
              margin: 'auto',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }),
          }}
          text="Laddar innehåll..."
        >
          <Router>
            <div className="App">
              <NavbarComponent />
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/spelare/:cell" component={Player} />
                <Route path="/spelare" component={Players} />
                <Route path="/resultat" component={Results} />
                <Route path="/tabell" component={Standings} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <FooterComponent />
            </div>
          </Router>
        </LoadingOverlay>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.player.loading,
  };
}

export default connect(mapStateToProps)(App);
