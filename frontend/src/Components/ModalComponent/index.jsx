import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class ModalComponent extends Component {
  render() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Logga in</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Mejladress</Form.Label>
              <Form.Control type="email" placeholder="Skriv in din mejl" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lösenord</Form.Label>
              <Form.Control type="password" placeholder="Lösenord" />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Avbryt</Button>
          <Button variant="primary">Logga in</Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default ModalComponent;
