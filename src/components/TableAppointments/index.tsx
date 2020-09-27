import React from 'react';
import Table from 'react-bootstrap/Table';

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
  return (
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
            <td>{item.patient.name}</td>
            <td>{item.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableAppointments;
