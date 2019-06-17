import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../Redux/actions/authActions';
import './Login.css';

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    errors: {},
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

onChange = (e) => {
  this.setState({ [e.target.id]: e.target.value });
};

onSubmit = (e) => {
  e.preventDefault();
  const newUser = {
    username: this.state.username,
    password: this.state.password,
    password2: this.state.password2,
  };
  this.props.registerUser(newUser, this.props.history);
};

render() {
  const { errors } = this.state;
  return (
    <Fragment>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Registrering</Modal.Title>
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
                  invalid: this.state.errors.password || this.state.errors.passwordincorrect,
                })}
                placeholder="Lösenord"
              />
              <span className="text-danger">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password2">Bekräfta lösenord</Form.Label>
              <Form.Control
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames('', {
                  invalid: errors.password2,
                })}
                placeholder="Bekräfta lösenord"
              />
              <span className="text-danger">
                {errors.password2}
              </span>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">Registrera</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </Fragment>
  );
}
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(withRouter(Register));
