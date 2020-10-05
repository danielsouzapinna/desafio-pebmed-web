/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

interface PatientDetail {
  name?: string;
  id: string;
}

interface Appointment {
  id: string;
  date: string;
  note: string;
  patient: PatientDetail;
  created_at?: string;
  updated_at?: string;
}

interface ModalProps {
  title: string;
  modalShow: boolean;
  initialNote: string;
  appointment: Appointment;
  close: () => void;
  actionInsert: (appointment: Appointment) => void;
  actionUpdate: (id: string, note: string) => void;
}

const UpdateModalAppointment: React.FC<ModalProps> = ({ title, modalShow, initialNote, appointment, close, actionInsert, actionUpdate }: ModalProps) => {
  if (!initialNote) {
    initialNote = '';
  }

  const [appointmentNote, setAppointmentNote] = useState(initialNote);
  const [validatedForm, setValidatedForm] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (appointment.note) {
      actionUpdate(appointment.id, appointmentNote);
    } else {
      appointment.note = appointmentNote;
      delete appointment.created_at;
      delete appointment.updated_at;
      actionInsert(appointment);
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
              <Form.Label>
                Data da Consulta:
                {new Date(appointment?.date).toLocaleDateString()}
              </Form.Label>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Control as="textarea" value={appointmentNote} onChange={e => setAppointmentNote(e.target.value)} rows={3} required />
              <Form.Control.Feedback type="invalid">Campo nota do agendamento é obrigatório.</Form.Control.Feedback>
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

export default UpdateModalAppointment;
