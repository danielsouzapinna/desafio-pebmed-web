import React from 'react';
import Table from 'react-bootstrap/Table';

interface Patient {
  id: string;
  name: string;
  dateBirth: string;
  gender: string;
  phone: string;
}

interface TablePatientsListProps {
  headers: string[];
  rows: Patient[];
}

const TablePatientsList: React.FC<TablePatientsListProps> = ({ headers, rows }: TablePatientsListProps) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {headers.map((item: string) => (
            <th>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item: Patient) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.dateBirth}</td>
            <td>{item.gender}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablePatientsList;
