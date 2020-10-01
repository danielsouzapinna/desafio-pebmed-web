import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import TablePatients from '../../components/TablePatients';
import API from '../../services/api';
import Toast from '../../components/Toast';

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
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');

  const handleCloseToast = (): void => {
    setShowToast(false);
  };

  useEffect(() => {
    API.get('patients')
      .then(result => {
        setPatients(result.data);
      })
      .catch(err => {
        setMsgToast('Erro ao consultar pacientes.');
        setShowToast(true);
      });
  }, []);

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Pacientes</h1>
        </Col>
        <Col>
          <Toast title="Atenção" text={msgToast} showToast={showToast} handleCloseToast={handleCloseToast} />
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
