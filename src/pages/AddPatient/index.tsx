import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MaskedInput from 'react-maskedinput';

import API from '../../services/api';
import Toast from '../../components/Toast';

const AddPatient: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [telephone, setTelephone] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');

  const handleResetForm = (): void => {
    setName('');
    setBirth('');
    setHeight('');
    setGender('');
    setWeight('');
    setTelephone('');
    setValidated(false);
  };

  const handleCloseToast = (): void => {
    setShowToast(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const tempBirth = new Date(birth);
      tempBirth.setDate(tempBirth.getDate() + 1);
      const dateBirth = new Date(tempBirth).toISOString();
      const patient = { name, dateBirth, height, weight, gender, telephone };

      API.post('patients', patient)
        .then(result => {
          if (result.status === 201) {
            setMsgToast('Paciente adicionado com sucesso.');
            handleResetForm();
            setShowToast(true);
          } else {
            setMsgToast('Erro ao processar dados.');
            setShowToast(true);
          }
          handleResetForm();
        })
        .catch(error => {
          if (error?.response?.status === 409) {
            setMsgToast('Paciente já existe.');
          } else {
            setMsgToast('Erro interno.');
          }
          setShowToast(true);
        });
    }

    setValidated(true);
  };

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Cadastro de Paciente</h1>
        </Col>
        <Col>
          <Toast title="Atenção" text={msgToast} showToast={showToast} handleCloseToast={handleCloseToast} />
        </Col>
      </Row>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Nome</Form.Label>
            <Form.Control name="name" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Nome" />
            <Form.Control.Feedback type="invalid">Campo nome é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Data de Nascimmento</Form.Label>
            <Form.Control type="date" name="birth" id="birth" value={birth} onChange={(e: any) => setBirth(e.target.value)} required placeholder="Nascimento" />
            <Form.Control.Feedback type="invalid">Campo data de nascimento é obrigatório.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Altura</Form.Label>
            <Form.Control as={MaskedInput} mask="1,11" name="height" id="height" value={height} onChange={(e: any) => setHeight(e.target.value)} required placeholder="Altura (ex. 99,99)" />
            <Form.Control.Feedback type="invalid">Campo altura é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Sexo</Form.Label>
            <Form.Control as="select" name="gender" id="gender" value={gender} onChange={(e: any) => setGender(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="male">Masculino</option>
              <option value="female">Femino</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">Campo sexo é obrigatório.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Peso</Form.Label>
            <Form.Control
              as={MaskedInput}
              mask="111,111"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e: any) => setWeight(e.target.value)}
              required
              placeholder="Peso (ex. 089,150 | 103,400)"
            />
            <Form.Control.Feedback type="invalid">Campo peso é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              as={MaskedInput}
              mask="11-11111-1111"
              name="telephone"
              id="telephone"
              value={telephone}
              onChange={(e: any) => setTelephone(e.target.value)}
              required
              placeholder="Telefone (ex. 99-99999-9999)"
            />
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
    </>
  );
};

export default AddPatient;
