import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PatientInformation from '../../components/PatientInformation';

const AddPatient: React.FC = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Cadastro de Paciente</h1>
        </Col>
      </Row>

      <PatientInformation validated={validated} handleSubmit={handleSubmit} />
    </>
  );
};

export default AddPatient;
