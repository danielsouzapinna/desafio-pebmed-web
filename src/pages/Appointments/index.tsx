import React from 'react';
import TableAppointmentsList from '../../components/TableAppointmentsList';

const Appointments: React.FC = () => {
  const labels = ['Paciente', 'Data'];
  const values = [
    {
      id: '1',
      date: '99/99/9999',
      patient: {
        name: 'João',
      },
    },
    {
      id: '2',
      date: '99/99/9999',
      patient: {
        name: 'Maria',
      },
    },
    {
      id: '3',
      date: '99/99/9999',
      patient: {
        name: 'José',
      },
    },
  ];

  return (
    <>
      <h1>Agendamentos</h1>
      <TableAppointmentsList headers={labels} rows={values} />
    </>
  );
};

export default Appointments;
