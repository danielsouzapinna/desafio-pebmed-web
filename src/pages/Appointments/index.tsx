import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import TableAppointmentsList from '../../components/TableAppointmentsList';

const Appointments: React.FC = () => {
  const labels = ['Paciente', 'Data'];
  const values = [
    {
      id: '1',
      date: '99/99/9999',
      patient: {
        name: 'João',
      },
    },
    {
      id: '2',
      date: '99/99/9999',
      patient: {
        name: 'Maria',
      },
    },
    {
      id: '3',
      date: '99/99/9999',
      patient: {
        name: 'José',
      },
    },
  ];

  return (
    <>
      <Row className="d-flex align-items-center my-3">
        <Col>
          <h1>Agendamentos</h1>
        </Col>
        <Col>
          <Button variant="outline-secondary" className="float-right">
            Novo Agendamento
          </Button>
        </Col>
      </Row>
      <TableAppointmentsList headers={labels} rows={values} />
    </>
  );
};

export default Appointments;
