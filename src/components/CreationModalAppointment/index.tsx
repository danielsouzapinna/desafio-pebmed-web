import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import API from '../../services/api';

interface Appointment {
  patientId: string;
  appointmentDate: string;
}

interface Patient {
  id: string;
  name: string;
}

interface ModalProps {
  title: string;
  modalShow: boolean;
  close: () => void;
  action: (appointment: Appointment) => Promise<boolean>;
}

const CreationModalAppointment: React.FC<ModalProps> = ({ title, modalShow, close, action }: ModalProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [idPatientSelected, setIdPatientSelected] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [validatedForm, setValidatedForm] = useState(false);

  useEffect(() => {
    API.get('patients')
      .then(result => {
        setPatients(result.data);
      })
      .catch(err => {
        console.error('Erro ao recuperar lista de pacientes.', err);
      });
  }, []);

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
      const appointment = { patientId: idPatientSelected, appointmentDate: appointmentDateISOString };

      if (action(appointment)) {
        setValidatedForm(false);
      }
    }

    setValidatedForm(true);
  };

  return (
    <Modal show={modalShow} onHide={() => close()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form noValidate validated={validatedForm} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
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
              <Form.Control as="select" name="gender" id="gender" value={idPatientSelected} onChange={(e: any) => setIdPatientSelected(e.target.value)} required>
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
          <Button variant="danger" onClick={() => close()}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreationModalAppointment;
