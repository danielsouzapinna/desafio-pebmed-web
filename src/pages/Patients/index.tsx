import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TablePatientsList from '../../components/TablePatientsList';

const Patients: React.FC = () => {
  const labels = ['Nome', 'Data Nascimento', 'Sexo', 'Telefone'];
  const values = [
    { id: '1', name: 'João', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
    { id: '2', name: 'Pedro', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
    { id: '3', name: 'Maria', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
  ];

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Pacientes</h1>
        </Col>
        <Col>
          <Button variant="outline-secondary" className="float-right">
            Novo Paciente
          </Button>
        </Col>
      </Row>
      <TablePatientsList headers={labels} rows={values} />
    </>
  );
};

export default Patients;
