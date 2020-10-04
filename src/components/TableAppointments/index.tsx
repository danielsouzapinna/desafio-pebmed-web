/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import format from 'date-fns/format';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import ModalPatient from '../ModalPatient';
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
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const history = useHistory();

  const handleDelete = (id: string) => {
    setId(id);
    handleShow();
  };

  const removeAppointment = () => {
    API.delete(`appointments/${id}`)
      .then(result => {
        if (result.status === 204) {
          const filteredAppointments = rows.filter(item => {
            return item.id !== id;
          });

          rows = filteredAppointments;
          history.push('/');
          history.push('/appointments');
          handleShow();
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

      <ModalPatient modalShow={show} title="Excluir Consulta" text="Tem certeza que deseja excluir a consulta?" action={removeAppointment} handleClose={handleShow} />
    </>
  );
};

export default TableAppointments;
