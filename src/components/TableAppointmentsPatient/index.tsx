/* eslint-disable camelcase */
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import API from '../../services/api';

interface PatientDetail {
  name: string;
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

interface TableAppointmentsPatientProps {
  headers: Array<string>;
  rows: Appointment[];
  patientId: string;
}

const TableAppointmentsPatient: React.FC<TableAppointmentsPatientProps> = ({ headers, rows, patientId }: TableAppointmentsPatientProps) => {
  const [showAppointment, setShowAppointment] = useState(false);
  const [validatedAppointmentNote, setValidatedAppointmentNote] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [appointment, setAppointment] = useState<Appointment>();

  const handleShowAppointment = (): void => {
    setAppointmentNote('');
    setShowAppointment(!showAppointment);
    setValidatedAppointmentNote(false);
  };

  const handleSubmitAppointmentNote = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const firstNote = !appointment.note;
      console.log(firstNote);
      appointment.note = appointmentNote;
      // const date = new Date(appointment.date);
      // date.setDate(date.getDate() - 1);
      // const dateISOString = new Date(date).toISOString();
      // appointment.date = dateISOString;
      appointment.patient = { id: patientId, name: '' };
      console.log(appointment);

      if (firstNote) {
        console.log('primeiro');
        API.patch('appointments', { id: appointment.id, note: appointment.note })
          .then(result => {
            if (result.status === 200) {
              setShowAppointment(!showAppointment);
            } else {
              console.log(result);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        delete appointment.patient.name;
        delete appointment.created_at;
        delete appointment.updated_at;
        API.put('appointments', appointment)
          .then(result => {
            if (result.status === 200) {
              setShowAppointment(!showAppointment);
            } else {
              console.log(result);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    setValidatedAppointmentNote(true);
  };

  const setSelectedAppointment = (item: Appointment): void => {
    setAppointment(item);
    setAppointmentNote(item.note);
    setShowAppointment(!showAppointment);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((item: string) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item: Appointment) => (
            <tr key={item.id}>
              <td>{format(new Date(item.date), 'dd-MM-yyyy')}</td>
              <td>{item.note}</td>
              <td>
                <Button variant="secondary" onClick={e => setSelectedAppointment(item)}>
                  Atualizar Anotação
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAppointment} onHide={() => handleShowAppointment()} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Form noValidate validated={validatedAppointmentNote} onSubmit={handleSubmitAppointmentNote}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Anotações do Atendimento</Modal.Title>
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
            <Button variant="danger" onClick={() => handleShowAppointment()}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default TableAppointmentsPatient;
