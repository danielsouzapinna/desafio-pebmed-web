import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  dateBirth: string;
  gender: string;
  phone: string;
}

interface TablePatientsProps {
  headers: string[];
  rows: Patient[];
}

const TablePatients: React.FC<TablePatientsProps> = ({ headers, rows }: TablePatientsProps) => {
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
        {rows.map((item: Patient) => (
          <tr key={item.id}>
            <td>
              <Link to="/patient-detail">{item.name}</Link>
            </td>
            <td>{item.dateBirth}</td>
            <td>{item.gender}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablePatients;
