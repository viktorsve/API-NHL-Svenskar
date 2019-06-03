import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import Homepage from './Screens/Homepage';
import Player from './Screens/Player';
import Players from './Screens/Players';
import Results from './Screens/Results';
import Standings from './Screens/Standings';
import NavbarComponent from './Components/NavbarComponent';
import FooterComponent from './Components/FooterComponent';
import './App.css';


class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { loading } = this.props;
    return (
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
        <div className="App">
          <Fragment>
            <Router>
              <NavbarComponent />
              <Switch>
                <Route exact path="/" component={Homepage} />
                <Route path="/spelare/:cell" component={Player} />
                <Route path="/spelare" component={Players} />
                <Route path="/resultat" component={Results} />
                <Route path="/tabell" component={Standings} />
              </Switch>
            </Router>
            <FooterComponent />
          </Fragment>
        </div>
      </LoadingOverlay>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(App);
