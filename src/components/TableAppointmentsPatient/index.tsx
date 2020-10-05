/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import Button from 'react-bootstrap/Button';

import API from '../../services/api';
import UpdateModalAppointment from '../UpdateModalAppointment';

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

interface TableAppointmentsPatientProps {
  headers: Array<string>;
  rows: Appointment[];
  patientId: string;
}

const TableAppointmentsPatient: React.FC<TableAppointmentsPatientProps> = ({ headers, rows, patientId }: TableAppointmentsPatientProps) => {
  const [showModal, setShowModal] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [appointmentSelected, setAppointmentSelected] = useState<Appointment>();
  const history = useHistory();

  const handleShowModal = (): void => {
    setAppointmentNote('');
    setShowModal(!showModal);
  };

  const updateAppointmentNote = (id: string, note: string): void => {
    API.patch('appointments', { id, note })
      .then(result => {
        if (result.status === 200) {
          setShowModal(!showModal);
          history.push(`/`);
          history.push(`/patient-detail/${patientId}`);
        } else {
          console.log(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const insertAppointmentNote = (appointment: Appointment): void => {
    appointment.patient = { id: patientId };
    API.put('appointments', appointment)
      .then(result => {
        if (result.status === 200) {
          setShowModal(!showModal);
        } else {
          console.log(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const setSelectedAppointment = (item: Appointment): void => {
    setAppointmentSelected(item);
    setAppointmentNote(item.note);
    setShowModal(!showModal);
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

      {appointmentSelected ? (
        <UpdateModalAppointment
          modalShow={showModal}
          title="Anotações do Atendimento"
          initialNote={appointmentNote}
          appointment={appointmentSelected}
          close={handleShowModal}
          actionUpdate={updateAppointmentNote}
          actionInsert={insertAppointmentNote}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default TableAppointmentsPatient;
