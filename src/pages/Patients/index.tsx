import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import TablePatients from '../../components/TablePatients';
import API from '../../services/api';

interface Patient {
  id: string;
  name: string;
  dateBirth: string;
  gender: string;
  telephone: string;
}

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const labels = ['Nome', 'Data Nascimento', 'Sexo', 'Telefone'];

  useEffect(() => {
    API.get('patients').then(result => {
      setPatients(result.data);
    });
  }, []);

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
          <Button as={Link} to="/add-patient" variant="outline-secondary" className="float-right">
            Novo Paciente
          </Button>
        </Col>
      </Row>
      <TablePatients headers={labels} rows={patients} />
    </>
  );
};

export default Patients;
