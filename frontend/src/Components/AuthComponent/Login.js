import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../Redux/actions/authActions';
import './Login.css';

class Login extends Component {
    state = {
      username: '',
      password: '',
      errors: {},
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard'); // push user to dashboard when they login
      }
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors,
        });
      }
    }

onChange = (e) => {
  this.setState({ [e.target.id]: e.target.value });
}

onSubmit = (e) => {
  e.preventDefault();

  const userData = {
    username: this.state.username,
    password: this.state.password,
  };

  this.props.loginUser(userData);
};

render() {
  return (
    <div className="container">
      <div style={{ paddingTop: '30px' }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>
            {' '}
            Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Logga in</b>
              {' '}
              below
            </h4>
            <p className="grey-text text-darken-1">

              Don't have an account?
              <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.username}
                error={this.state.errors.username}
                id="username"
                type="text"
                className={classnames('', {
                  invalid: this.state.errors.username || this.state.errors.usernamenotfound,
                })}
              />
              <label htmlFor="username">Username</label>
              <span className="red-text">
                {this.state.errors.username}
                {this.state.errors.usernamenotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={this.state.errors.password}
                id="password"
                type="password"
                className={classnames('', {
                  invalid: this.state.errors.password || this.state.errors.passwordincorrect,
                })}
              />
              <label htmlFor="password">Password</label>
              <span className="red-text">
                {this.state.errors.password}
                {this.state.errors.passwordincorrect}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >

                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="push" />
    </div>
  );
}
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(Login);
