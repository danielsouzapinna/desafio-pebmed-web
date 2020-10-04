import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

import TableAppointments from '../../components/TableAppointments';
import API from '../../services/api';
import Toast from '../../components/Toast';

interface Appointment {
  id: string;
  date: string;
  patient: {
    name: string;
  };
}

interface Patient {
  id: string;
  name: string;
  dateBirth: string;
  gender: string;
  telephone: string;
}

const Appointments: React.FC = () => {
  const labels = ['Paciente', 'Data', 'Ação'];
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [idPatient, setIdPatient] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const history = useHistory();

  const handleShow = () => setShow(!show);

  const handleCloseToast = (): void => {
    setShowToast(false);
  };

  const handleResetForm = (): void => {
    setIdPatient('');
    setAppointmentDate('');
    setValidated(false);
  };

  const createAppointments = () => {
    console.log('create');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const tempAppointmentDate = new Date(appointmentDate);
      tempAppointmentDate.setDate(tempAppointmentDate.getDate() + 1);
      const appointmentDateISOString = new Date(tempAppointmentDate).toISOString();
      const appointment = { patientId: idPatient, appointmentDate: appointmentDateISOString };

      API.post('appointments', appointment)
        .then(result => {
          if (result.status === 201) {
            setMsgToast('Agendamento cadastrado com sucesso.');
            setShowToast(true);
            handleShow();
            history.push('/');
            history.push('/appointments');
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

  useEffect(() => {
    API.get('appointments')
      .then(result => {
        setAppointments(result.data);
      })
      .catch(err => {
        setMsgToast('Erro ao listar consultas.');
        setShowToast(true);
      });

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
          <h1>Agendamentos</h1>
        </Col>
        <Col>
          <Toast title="Atenção" text={msgToast} showToast={showToast} handleCloseToast={handleCloseToast} />
        </Col>
        <Col>
          <Button variant="outline-secondary" className="float-right" onClick={e => handleShow()}>
            Novo Agendamento
          </Button>
        </Col>
      </Row>

      <TableAppointments headers={labels} rows={appointments} />

      <Modal show={show} onHide={() => handleShow()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Novo Agendamento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Data de Consulta</Form.Label>
                <Form.Control type="date" name="birth" id="birth" value={appointmentDate} onChange={(e: any) => setAppointmentDate(e.target.value)} required placeholder="Consulta" />
                <Form.Control.Feedback type="invalid">Campo data de consulta é obrigatório.</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Paciente</Form.Label>
                <Form.Control as="select" name="gender" id="gender" value={idPatient} onChange={(e: any) => setIdPatient(e.target.value)} required>
                  <option value="">Selecione</option>
                  {patients.map((item: Patient) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">Campo paciente é obrigatório.</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Salvar
            </Button>
            <Button variant="danger" onClick={() => handleShow()}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Appointments;
