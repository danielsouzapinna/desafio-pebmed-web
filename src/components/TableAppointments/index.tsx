/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import ConfirmationModal from '../ConfirmationModal';
import API from '../../services/api';

interface PatientDetail {
  name: string;
}

interface Appointment {
  id: string;
  date: string;
  patient: PatientDetail;
}

interface TableAppointmentsProps {
  headers: string[];
  rows: Appointment[];
}

const TableAppointments: React.FC<TableAppointmentsProps> = ({ headers, rows }: TableAppointmentsProps) => {
  const [id, setId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (): void => setShowModal(!showModal);
  const history = useHistory();

  const handleDelete = (idSelectedToDelete: string): void => {
    setId(idSelectedToDelete);
    handleShowModal();
  };

  const removeAppointment = async (): Promise<void> => {
    await API.delete(`appointments/${id}`)
      .then(result => {
        if (result.status === 204) {
          const filteredAppointments = rows.filter(item => {
            return item.id !== id;
          });
          rows = filteredAppointments;
          history.push('/');
          history.push('/appointments');
        }
      })
      .catch(err => {
        console.log(err);
      });
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
          {rows.map((item: any) => (
            <tr key={item.id}>
              <td>{item.patient.name}</td>
              <td>{format(new Date(item.date), 'dd-MM-yyyy')}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal modalShow={showModal} title="Excluir Consulta" text="Tem certeza que deseja excluir a consulta?" action={removeAppointment} handleClose={handleShowModal} />
    </>
  );
};

export default TableAppointments;
