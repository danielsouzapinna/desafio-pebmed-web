import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const PatientInformation: React.FC = () => {
  return (
    <>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDateBirth">
            <Form.Label>Data de Nascimmento</Form.Label>
            <Form.Control placeholder="Nascimento" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHeight">
            <Form.Label>Altura</Form.Label>
            <Form.Control placeholder="Altura" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridGender">
            <Form.Label>Sexo</Form.Label>
            <Form.Control placeholder="Sexo" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridWeight">
            <Form.Label>Peso</Form.Label>
            <Form.Control placeholder="Peso" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridPhone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control placeholder="Telefone" />
          </Form.Group>

          <Form.Group as={Col} />
        </Form.Row>
      </Form>
    </>
  );
};

export default PatientInformation;
