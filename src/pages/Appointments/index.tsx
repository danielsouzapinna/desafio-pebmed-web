import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CreationModalAppointment from '../../components/CreationModalAppointment';
import TableAppointments from '../../components/TableAppointments';
import Toast from '../../components/Toast';
import API from '../../services/api';

interface AppointmentCreate {
  patientId: string;
  appointmentDate: string;
}

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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [msgToast, setMsgToast] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleShowModal = (): void => setShowModal(!showModal);

  const handleCloseToast = (): void => {
    setShowToast(false);
  };

  const createAppointment = async (appointment: AppointmentCreate): Promise<boolean> => {
    const response = await API.post('appointments', appointment)
      .then(result => {
        if (result.status === 201) {
          setMsgToast('Agendamento cadastrado com sucesso.');
          setShowToast(true);
          handleShowModal();
          history.push('/');
          history.push('/appointments');
        } else {
          setMsgToast('Erro ao processar dados.');
          setShowToast(true);
        }
        return true;
      })
      .catch(error => {
        if (error?.response?.status === 409) {
          setMsgToast('Paciente já existe.');
        } else {
          setMsgToast('Erro interno.');
        }
        setShowToast(true);
        return false;
      });
    return response;
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
          <Button variant="outline-secondary" className="float-right" onClick={e => handleShowModal()}>
            Novo Agendamento
          </Button>
        </Col>
      </Row>

      <TableAppointments headers={labels} rows={appointments} />

      <CreationModalAppointment modalShow={showModal} title="Novo Agendamento" close={handleShowModal} action={createAppointment} />
    </>
  );
};

export default Appointments;
