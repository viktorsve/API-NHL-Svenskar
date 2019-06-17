import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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
        this.props.history.push('/dashboard');
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
  console.log(this.props.auth.user);
};

render() {
  const { errors } = this.state;
  return (
    <Fragment>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Logga in</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="username">Användarnamn</Form.Label>
              <Form.Control
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id="username"
                type="text"
                className={classnames('', {
                  invalid: errors.username || errors.usernamenotfound,
                })}
                placeholder="Skriv in ditt användarnamn"
              />
              <span className="text-danger">
                {errors.username}
                {errors.usernamenotfound}
              </span>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Lösenord</Form.Label>
              <Form.Control
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames('', {
                  invalid: errors.password || errors.passwordincorrect,
                })}
                placeholder="Lösenord"
              />
              <span className="text-danger">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </Form.Group>
            <Modal.Footer>
              <Link to="/register">Skapa ett konto</Link>
              <Button variant="primary" type="submit">Logga in</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Fragment>
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
