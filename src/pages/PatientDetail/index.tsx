/* eslint-disable prefer-const */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import MaskedInput from 'react-maskedinput';

import ConfirmationModal from '../../components/ConfirmationModal';
// import PatientInformation from '../../components/PatientInformation';
import TableAppointmentsPatient from '../../components/TableAppointmentsPatient';
import API from '../../services/api';
import Toast from '../../components/Toast';

interface Appointment {
  id: string;
  date: string;
  note: string;
  patient: {
    name: string;
  };
}

const PatientDetail: React.FC = () => {
  const { id } = useParams();
  let history = useHistory();

  const [validated, setValidated] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [telephone, setTelephone] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');

  const handleEditForm = (): void => setEdit(!edit);
  const handleShowModal = (): void => setShowModal(!showModal);

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
      const patient = { id, name, dateBirth, height, weight, gender, telephone };

      API.put('patients', patient)
        .then(result => {
          if (result.status === 200) {
            setMsgToast('Paciente Atualizado com sucesso.');
            setShowToast(true);
          } else {
            setMsgToast('Erro ao processar dados.');
            setShowToast(true);
          }
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

  useEffect(() => {
    API.get(`patients/${id}`)
      .then(result => {
        if (result.status === 200) {
          setName(result.data.name);
          let date = new Date(result.data.dateBirth);
          date.setHours(0, 0, 0, 0);
          let dateBirth = date.toISOString().slice(0, 10).split('-');
          let dateStr = `${dateBirth[0]}-${dateBirth[1]}-${dateBirth[2]}`;
          setBirth(dateStr);
          setHeight(result.data.height.toString());
          setGender(result.data.gender);
          setWeight(result.data.weight.toString());
          setTelephone(result.data.telephone);
          setAppointments(result.data.appointments);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const removePatient = () => {
    console.log('entrou');
    API.delete(`patients/${id}`)
      .then(result => {
        if (result.status === 204) {
          handleShowModal();
          history.push('/patients');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  let headers: Array<string> = ['Data', 'Atendimento', 'Atualizar Anotação'];

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Paciente</h1>
        </Col>
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-secondary" className="mr-2" onClick={handleEditForm}>
              Editar Cadastro
            </Button>
            <Button variant="outline-danger" onClick={handleShowModal}>
              Excluir Cadastro
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="auto">
        <Col>
          <Toast title="Atenção" text={msgToast} showToast={showToast} handleCloseToast={handleCloseToast} />
        </Col>
      </Row>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Nome</Form.Label>
            {edit ? (
              <Form.Control name="name" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Nome" />
            ) : (
              <Form.Control name="name" id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Nome" disabled />
            )}
            <Form.Control.Feedback type="invalid">Campo nome é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Data de Nascimmento</Form.Label>
            {edit ? (
              <Form.Control type="date" name="birth" id="birth" value={birth} onChange={(e: any) => setBirth(e.target.value)} required placeholder="Nascimento" />
            ) : (
              <Form.Control type="date" name="birth" id="birth" value={birth} onChange={(e: any) => setBirth(e.target.value)} required placeholder="Nascimento" disabled />
            )}
            <Form.Control.Feedback type="invalid">Campo data de nascimento é obrigatório.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Altura</Form.Label>
            {edit ? (
              <Form.Control as={MaskedInput} mask="1,11" name="height" id="height" value={height} onChange={(e: any) => setHeight(e.target.value)} required placeholder="Altura (ex. 99,99)" />
            ) : (
              <Form.Control as={MaskedInput} mask="1,11" name="height" id="height" value={height} onChange={(e: any) => setHeight(e.target.value)} required placeholder="Altura (ex. 99,99)" disabled />
            )}
            <Form.Control.Feedback type="invalid">Campo altura é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Sexo</Form.Label>
            {edit ? (
              <Form.Control as="select" name="gender" id="gender" value={gender} onChange={(e: any) => setGender(e.target.value)} required>
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Femino</option>
              </Form.Control>
            ) : (
              <Form.Control as="select" name="gender" id="gender" value={gender} onChange={(e: any) => setGender(e.target.value)} required disabled>
                <option value="">Selecione</option>
                <option value="male">Masculino</option>
                <option value="female">Femino</option>
              </Form.Control>
            )}

            <Form.Control.Feedback type="invalid">Campo sexo é obrigatório.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Peso</Form.Label>
            {edit ? (
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
            ) : (
              <Form.Control
                as={MaskedInput}
                mask="111,111"
                name="weight"
                id="weight"
                value={weight}
                onChange={(e: any) => setWeight(e.target.value)}
                required
                placeholder="Peso (ex. 089,150 | 103,400)"
                disabled
              />
            )}
            <Form.Control.Feedback type="invalid">Campo peso é obrigatório.</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Telefone</Form.Label>
            {edit ? (
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
            ) : (
              <Form.Control
                as={MaskedInput}
                mask="11-11111-1111"
                name="telephone"
                id="telephone"
                value={telephone}
                onChange={(e: any) => setTelephone(e.target.value)}
                required
                placeholder="Telefone (ex. 99-99999-9999)"
                disabled
              />
            )}
            <Form.Control.Feedback type="invalid">Campo telefone é obrigatório.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} />
        </Form.Row>

        <>
          {edit ? (
            <Button type="submit" variant="outline-secondary" block>
              Atualizar Cadastro
            </Button>
          ) : (
            <></>
          )}
        </>
      </Form>

      <TableAppointmentsPatient headers={headers} rows={appointments} patientId={id} />

      <ConfirmationModal modalShow={showModal} title="Excluir Paciente" text="Tem certeza que deseja excluir o paciente" action={removePatient} handleClose={handleShowModal} />
    </>
  );
};

export default PatientDetail;
