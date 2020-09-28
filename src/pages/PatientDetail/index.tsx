/* eslint-disable prefer-const */
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import PatientInformation from '../../components/PatientInformation';
import TableAppointmentsPatient from '../../components/TableAppointmentsPatient';
import ModalPatient from '../../components/ModalPatient';

const PatientDetail: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let headers: Array<string> = ['Data', 'Atendimento'];
  let rows = [
    {
      id: '1',
      date: '99/99/9999',
      note: 'Atendimento Teste para uso interno',
      patient: {
        name: 'João',
      },
    },
    {
      id: '2',
      date: '99/99/9999',
      note: 'Atendimento Teste para uso interno',
      patient: {
        name: 'João',
      },
    },
    {
      id: '3',
      date: '99/99/9999',
      note: 'Atendimento Teste para uso interno',
      patient: {
        name: 'João',
      },
    },
  ];

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Paciente</h1>
        </Col>
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-secondary" className="mr-2">
              Editar Cadastro
            </Button>
            <Button variant="outline-danger" onClick={handleShow}>
              Excluir Cadastro
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* <PatientInformation /> */}

      <ButtonGroup className="mb-4">
        <Button variant="outline-secondary">Inserir Anotações</Button>
      </ButtonGroup>

      <TableAppointmentsPatient headers={headers} rows={rows} />

      <ModalPatient show title="Excluir Paciente" text="Tem certeza que deseja excluir o paciente" handleClose={handleClose} />
    </>
  );
};

export default PatientDetail;
