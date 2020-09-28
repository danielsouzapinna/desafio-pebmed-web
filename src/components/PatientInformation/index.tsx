/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

interface IPatientInformation {
  validated: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PatientInformation: React.FC<IPatientInformation> = ({ validated, handleSubmit }: IPatientInformation) => {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nome</Form.Label>
          <Form.Control required placeholder="Nome" />
          <Form.Control.Feedback type="invalid">Campo nome é obrigatório.</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridDateBirth">
          <Form.Label>Data de Nascimmento</Form.Label>
          <Form.Control required placeholder="Nascimento" />
          <Form.Control.Feedback type="invalid">Campo data de nascimento é obrigatório.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridHeight">
          <Form.Label>Altura</Form.Label>
          <Form.Control required placeholder="Altura" />
          <Form.Control.Feedback type="invalid">Campo altura é obrigatório.</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridGender">
          <Form.Label>Sexo</Form.Label>
          <Form.Control as="select" custom required>
            <option value="" />
            <option value="male">Masculino</option>
            <option value="female">Femino</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">Campo sexo é obrigatório.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridWeight">
          <Form.Label>Peso</Form.Label>
          <Form.Control required placeholder="Peso" />
          <Form.Control.Feedback type="invalid">Campo peso é obrigatório.</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridPhone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control required placeholder="Telefone" />
          <Form.Control.Feedback type="invalid">Campo telefone é obrigatório.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} />
      </Form.Row>

      <>
        <Button type="submit" variant="outline-secondary" block>
          Salvar Cadastro
        </Button>
      </>
    </Form>
  );
};

export default PatientInformation;
