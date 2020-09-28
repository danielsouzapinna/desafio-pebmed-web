import React from 'react';
import Table from 'react-bootstrap/Table';

interface PatientDetail {
  name: string;
}

interface Appointment {
  id: string;
  date: string;
  note: string;
  patient: PatientDetail;
}

interface TableAppointmentsPatientProps {
  headers: Array<string>;
  rows: Appointment[];
}

const TableAppointmentsPatient: React.FC<TableAppointmentsPatientProps> = ({ headers, rows }: TableAppointmentsPatientProps) => {
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
            <td>{item.date}</td>
            <td>{item.note}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableAppointmentsPatient;
