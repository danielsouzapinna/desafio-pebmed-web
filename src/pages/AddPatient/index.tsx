import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import PatientInformation from '../../components/PatientInformation';

const AddPatient: React.FC = () => {
  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Cadastro de Paciente</h1>
        </Col>
        <Col>
          <ButtonGroup className="float-right">
            <Button variant="outline-secondary" className="mr-2">
              Salvar Cadastro
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <PatientInformation />
    </>
  );
};

export default AddPatient;
