import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

interface Patient {
  id: string;
  name: string;
  dateBirth: string;
  gender: string;
  telephone: string;
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
        {rows.length > 0 ? (
          rows.map((item: Patient) => (
            <tr key={item.id}>
              <td>
                <Link to={`/patient-detail/${item.id}`}>{item.name}</Link>
              </td>
              <td>{format(new Date(item.dateBirth), 'dd-MM-yyyy')}</td>
              <td>{item.gender === 'male' ? 'Masculino' : 'Feminno'}</td>
              <td>{item.telephone}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>Sem pacientes</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TablePatients;
