import React from 'react';
import TablePatientsList from '../../components/TablePatientsList';

const Patients: React.FC = () => {
  const labels = ['Nome', 'Data Nascimento', 'Sexo', 'Telefone'];
  const values = [
    { name: 'João', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
    { name: 'Pedro', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
    { name: 'Maria', dateBirth: '99/99/9999', gender: 'Masculino', phone: '(99) 99999-9999' },
  ];

  return (
    <>
      <h1>Pacientes</h1>
      <TablePatientsList headers={labels} rows={values} />
    </>
  );
};

export default Patients;
